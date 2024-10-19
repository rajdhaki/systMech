import mongoose from "mongoose";

const userScema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
        min: 6,
    },
},

)



const systmetch = new mongoose.model("systmetch", userScema)

export {systmetch}
