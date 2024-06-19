const mongoose=require('mongoose');
const {Schema}=mongoose;

const BlogSchema=new Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        required:true
    }
});

const Blog=mongoose.model('blog',BlogSchema);

module.exports=Blog;