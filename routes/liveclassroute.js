import mongoose from "mongoose";
import Liveclass from "../models/liveclass.js";
import express,{Router} from "express";
const router=Router();
router.get("/all",async(req,res)=>{

    try{
        const liveclasses=await Liveclass.find();
        if(liveclasses.length===0) return res.status(400).json({message:"Liveclass not available"})
        res.status(201).json(liveclasses)

    }
    catch(e){
        console.log(e);
        res.status(500).json({message:e.message})

    }
})

router.post("/add",async(req,res)=>{
    try{
        const {subjectname,duration,link,time,teachername,topicname}=req.body;
        if(!subjectname || !duration || !link|| !time || ! teachername || !topicname){
            return res.status(400).json({message:"all feilds are required"})
        }
        const newclass=new Liveclass({
            subjectname,duration,time,teachername,topicname,link
        })
        await newclass.save();
        return res.status(201).json({message:"added successfully",newclass})
    }
    catch(e){
        return res.status(501).json({message:"error creacting class",e})

    }
})

export default router;