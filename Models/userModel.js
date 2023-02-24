// Mongoose model for users and functions to handle signup, login

const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      reuired: true
   },
   blogname: {
      type: String,
      reuired: true
   }
})

//  Static signup method
//  The statics object is a way to define functions that are 
//  attached to the schema itself rather than to an instance of the schema. 
//  This means that you can call these functions directly on the model, 
//  without having to create an instance of the model first.
//  Signup is a static function that takes in an email,
//  password, and blogname as arguments. 
//  It first checks if all three arguments are provided, and if not, 
//  it throws an error indicating that all fields are required. 
//  It then checks if the email is a valid email address and if the 
//  password is strong enough using the validator library. 
//  If either check fails, 
//  it throws an error indicating what the problem is.

userSchema.statics.signup = async function (email, password, blogname) {

   if (!email || !password || !blogname) {
      throw Error('All fields are required.')
   }

   // Checking the security of email and password with validator library
   if (!validator.isEmail(email)) {
      throw Error('E-mail is not valid.')
   }
   if (!validator.isStrongPassword(password)) {
      throw Error('Password is not strong enough.')
   }

   // Checking if the email already exists
   const exists = await this.findOne({ email })

   if (exists) {
      throw Error('E-mail already exists.')
   }

   // Checking if the blogName already exists
   const existsName = await this.findOne({ blogname })

   if (existsName) {
      throw Error('Blogname already exists.')
   }

   //Salt is a random string
   const salt = await bcrypt.genSalt(10)

   // Hashing the password and adding the salt string
   const hash = await bcrypt.hash(password, salt)

   //Creating a new user in the database
   const user = await this.create({ blogname, email, password: hash })

   return user
}

//  Static login method
//  The function searches for a user with the specified email using the findOne method,
//  which is a method provided by Mongoose to query the database.
//  If no user is found, it throws an error indicating that the email is incorrect.

//  Next, the function uses the bcrypt.compare method to compare the provided password
//  with the hashed password stored in the database for the specified user. If the passwords 
//  do not match, the function throws an error indicating that the password is incorrect.

//  If the email and password are both correct, the function returns an object that includes 
//  the user object and the blogname property of the user object.

//  Finally, the code exports the User model, which is created by passing the userSchema to the mongoose.model method.
//  This model can be used to interact with the users collection in the database.


userSchema.statics.login = async function (email, password) {

   // Checking fields
   if (!email || !password) {
      throw Error('All fields are required.')
   }

   // Comparing the email with the database email
   const user = await this.findOne({ email })
   if (!user) {
      throw Error('Inexistent e-mail.')
   }

   // Comparing the password
   const match = await bcrypt.compare(password, user.password)

   if (!match) {
      throw Error("Incorrect password.")
   }

   return { user, blogname: user.blogname }
}

module.exports = mongoose.model('User', userSchema)