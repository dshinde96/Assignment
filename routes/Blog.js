const express=require('express');
const router=express.Router();
const {handleUpdateBlog,handleNewBlog,handleGetBlog,handleAllBlogs}=require('../controllers/Blog');


router.route('/All').get(handleAllBlogs);

router.route('/').get(handleGetBlog).post(handleNewBlog).put(handleUpdateBlog);
module.exports=router;