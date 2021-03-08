import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose'
export const getPosts=async(req,res)=>{
    try{
        const postMessage=await PostMessage.find();
        res.status(200).json(postMessage)
    }catch(err){
        res.status(404).json({message:err.message})
    }
}
export const createPost=async(req,res)=>{
    const post=req.body;
    const newPost=new PostMessage(post)
    try{
        console.log("Successfully posted memory");
        await newPost.save()
        res.status(201).json(newPost)
    }catch(err){
        res.status(409).json({message:err.message})
    }
}
export const updatePost=async(req,res)=>{
    const {id:_id} =req.params;
    const updatedPost=req.body
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send('No post with that id')

    const newUpdatedPost=await PostMessage.findByIdAndUpdate(_id,updatedPost,{new:true});
    res.json(newUpdatedPost);
}
export const deletePost=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send('No post with that id')
    console.log("delete server req")
    await PostMessage.findByIdAndRemove(id);
    res.json({message:'Successfully Deleted the memory'})

}
export const likePost=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send('No post with that id')
    const post= await PostMessage.findById(id);
    const updatePost=await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});
    res.json(updatePost);
}