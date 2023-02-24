// Managing functions for users

// Importing user model and nodemailer library
const User = require('../Models/userModel')
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");

//Creating the token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: '3d' })
}

// Login function
const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {
        // Using the static login method from User model
        const { user } = await User.login(email, password)
        const token = createToken(user._id)
        blogname = user.blogname
        res.status(200).json({ email, token, blogname })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete user function
const deleteUser = async (req, res) => {

    console.log('Received request:', req.params);

    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await User.findOneAndDelete({ email });
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting user' });
    }

    res.status(200).json({ message: 'User successfully deleted' });

    console.log('User successfully deleted');

    // sending an email in order to delete the user informations from the CMS

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'buildthewebfaster@gmail.com',
            pass: process.env.SECRET_GMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: 'buildthewebfaster@gmail.com',
        to: 'buildthewebfaster@gmail.com',
        subject: 'User Deleted',
        text: `User with email ${email} has been deleted from the db, PROVIDE TO DELETE ALL HIS CONTENT`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

// Signup user function
const signupUser = async (req, res) => {
    const { email, password, blogname } = req.body
    try {
        const user = await User.signup(email, password, blogname)

        //create a token
        const token = createToken(user._id)
        res.status(200).json({ email, token, blogname })
        console.log("Signup OK")
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginUser, signupUser, deleteUser }