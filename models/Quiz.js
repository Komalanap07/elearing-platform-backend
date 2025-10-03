import mongoose from "mongoose";
const quizschema=mongoose.Schema({
    question:String,
    Options:[String],
    correctans:String
})