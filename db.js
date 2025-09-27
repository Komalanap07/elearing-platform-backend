import mongoose, { mongo } from 'mongoose';
const connectdb=async()=>{
    try{
        await mongoose.connect("mongodb+srv://komalanap07_db_user:5503@cluster0.wreqbei.mongodb.net/elearning?retryWrites=true&w=majority");
        console.log("mongodb connected");
    }
    catch(e){
        console.log("error :",e);

    }
}
export default connectdb;