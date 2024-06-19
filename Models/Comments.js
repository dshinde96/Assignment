const mongoose=require('mongoose');
const {Schema}=mongoose;

const CommentSchema=new Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog"
    },
    body:{
        type:String
    }
})

const Comment=mongoose.model("comment",CommentSchema);

module.exports=Comment;