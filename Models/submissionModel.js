// Mongoose model for submissions

const mongoose = require("mongoose")

const Schema = mongoose.Schema

const submissionSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
},
    { timestamps: true }

)
module.exports = mongoose.model('submission', submissionSchema);