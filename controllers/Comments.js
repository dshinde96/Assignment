const Comment=require("../Models/Comments");

const handleGetComments=async(req,res)=>{
    try {
        const {blog}=req.query;
        const comments=await Comment.find({blog:blog});
        return res.json({comments});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({status:"Failed",message:"Internal server error"});
    }
}

const handleAddComment=async(req,res)=>{
    try {
        const {blog}=req.query;
        const {body}=req.body;
        await Comment.create({
            blog,
            body
        })
        return res.json({message:"Comment added successfully"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({status:"Failed",message:"Internal server error"});
    }
}
const handleUpdateComment=async(req,res)=>{
    try {
        const {id}=req.query;
        const {body}=req.body;
        let comment=await Comment.findById(id);
        if(!comment){
            return res.status(404).json({message:"Comment not found"});
        }
        comment.body=body;
        await comment.save();
        return res.json({comment});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({status:"Failed",message:"Internal server error"});
    }
}
module.exports={handleGetComments,handleAddComment,handleUpdateComment};