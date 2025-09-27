import mongoose from 'mongoose';
import { type } from 'os';
const CourseSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
    ,description:{
        type:String,
    },
    duration:{
        type:String,
    },
    createdat:{
        type:Date,
        default:Date.now
    }
})
const Course=mongoose.model("Course",CourseSchema);
export default Course;
