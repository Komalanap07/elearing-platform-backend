import mongoose from "mongoose";
import { type } from "os";
const liveclassschema = mongoose.Schema({
  subjectname: {
    type: String,
    required: true,
  },
  topicname: {
    type: String,
    required: true,
  },
  link:{
    type:String,
    required:true,
  },
  time: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  teachername: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Liveclass",liveclassschema)