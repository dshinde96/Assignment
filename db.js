const mongoose=require('mongoose');

const connectToDB=async(mongoURI)=>{
    try {
        await mongoose.connect(mongoURI);
        console.log("Database connected");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports=connectToDB;