require('dotenv').config();
const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const Blog=require('./routes/Blog');
const Comment=require('./routes/Comment');
const {join}=require('path');
const ConnectToDB=require('./db');


ConnectToDB(process.env.DATABASE_URL);

const app=express();
app.use(express.json());

const server=http.createServer(app);
const io = new Server(server);

io.on('connection',(socket)=>{
    console.log("Connected");
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

app.use('/api',(req,res,next)=>{
    req.ConnectionSocket=io;
    next();
},Blog);

app.use('/api',(req,res,next)=>{
    req.ConnectionSocket=io;
    next();
},Comment);

server.listen(8000,()=>console.log("App is running on port 8000"));
