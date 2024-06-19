const Blog=require('../Models/Blog');
const handleAllBlogs=async(req,res)=>{
    try {
        const blogs=await Blog.find();
        return res.json({status:"Success",blogs:blogs});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({status:"Failed",message:"Internal server error"});
    }
}

const handleGetBlog=async(req,res)=>{
    try {
        const {id}=req.query;
        const blog=await Blog.findById(id);

        return res.json({status:"Success",blog:blog});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({status:"Failed",message:"Internal server error"});
    }
}

const handleNewBlog=async(req,res)=>{
    try {
        const {ConnectionSocket}=req;
        const {title,body}=req.body;
        const blog=await Blog.create({
            title,
            body
        });
        if(ConnectionSocket!=null){
            ConnectionSocket.emit('newBlog',{blog:blog});
        }
        return res.json({status:"Success",blog:blog});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({status:"Failed",message:"Internal server error"});
    }
}

const handleUpdateBlog=async(req,res)=>{
    try {
        const {ConnectionSocket}=req;
        const {id}=req.query;
        const {title,body}=req.body;

        let blog=await Blog.findById(id);
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        blog.title=title;
        blog.body=body;

        blog=await blog.save();
        if(ConnectionSocket!=null){
            ConnectionSocket.emit('updateBlog',{blog:blog});
        }
        return res.json({blog:blog});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({status:"Failed",message:"Internal server error"});
    }
}

module.exports={handleUpdateBlog,handleNewBlog,handleGetBlog,handleAllBlogs};