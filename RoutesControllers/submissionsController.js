// Managing functions for submissions

// Submissions model and Mongoose import
const Submission = require("../Models/submissionModel");
const mongoose = require('mongoose');

// Get all the submissions
const getSubmission = async (req, res) => {
    const user_id = req.user._id
    const submissions = await Submission.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(submissions)
}

// Creating a new submission
const createSubmission = async (req, res) => {

    const { title, description } = req.body;

    try {
        const user_id = req.user._id
        const submission = await Submission.create({ title, description, user_id })
        res.status(200).json(submission)
        console.log('Dev/Message: New submission succesfully post')
    }
    catch (error) {
        console.log('Dev/Message: error during creating a new submission')
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createSubmission,
    getSubmission
}
