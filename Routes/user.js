//Express and Router
const express = require("express");
const router = express.Router()

//Importing functions to handle routes
const { loginUser, signupUser, deleteUser } = require("../RoutesControllers/userControllers")

//Login route
router.post("/login", loginUser)

//Signup route
router.post("/signup", signupUser)

// Delete route
router.delete("/:email", deleteUser)

module.exports = router;