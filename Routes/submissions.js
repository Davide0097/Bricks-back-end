//Express and Router
const express = require('express');
const router = express.Router();

const Post = require("../Models/submissionModel");

// Importing the middleware
const requireUser = require('../Middleware/requireUser')

//Importing functions to handle routes
const { getSubmission, createSubmission } = require('../RoutesControllers/submissionsController');

// Using the middleware to check for auth
router.use(requireUser)

// Get all the submissions route
router.get('/CreatorHub', getSubmission)

// Post a new submission ruote
router.post('/CreatorHub', createSubmission)

module.exports = router;










