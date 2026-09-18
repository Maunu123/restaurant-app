import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood=async(req,res)=>{

    let image_filename=`${req.file.filename}`;


    console.log(req.body.name)
    console.log(req.body.description)
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category
    })
    try{
        await food.save();

        console.log("Food added successfully");
        res.json({success:true,message:"Food Added"})
    }catch(err){
        console.log(err);
        res.json({success:false,message: err?.message || "Error"})
    }

}



const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(err){
        console.log(err);
        res.json({success:false,message: err?.message || "Error"})
    }
    }

const removeFood=async(req,res)=>{
    try{
        console.log(req.body)
        const food=await foodModel.findById(req.body.id);

        fs.unlink(`uploads/${food.image}`,()=>{})


        await foodModel.findByIdAndDelete(req.body.id);
        
        res.json({success:true,message:"Food Removed"})
    }catch(err){
        console.log(err);
        res.json({success:false,message: err?.message || "Error"})
        

    }

}

export {addFood,listFood,removeFood}