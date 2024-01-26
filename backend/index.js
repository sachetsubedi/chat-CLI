import express from "express";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Resonse");
});
const httpServer=app.listen(3000, console.log("Server running at 3000"));
const io= new Server(httpServer,{
    cors:{
        origin:'*'
    }
})

io.on('connection',(socket)=>{
    let userName=Math.floor(Math.random()*100);
    // send connection message
    io.emit('connected',userName)

    // message sent
    socket.on('message',(mess)=>{
        console.log(mess);
        io.emit('message',{userName:userName,message:mess});
    })

    // rename user

    socket.on('rename',(newUserName)=>{
        const oldUsername=userName;
        userName=newUserName;
        io.emit('rename',{oldUsername,userName});
    })
    
})