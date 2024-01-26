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
    console.log("connected");
    socket.on('message',(mess)=>{
        console.log(mess);
        socket.emit('message',mess)
    })
})