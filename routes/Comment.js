const express=require('express');
const router=express.Router();
const {handleGetComments,handleAddComment,handleUpdateComment}=require("../controllers/Comments");
router.route('/').get(handleGetComments).post(handleAddComment).put(handleUpdateComment);

module.exports=router;