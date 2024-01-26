// import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
const socket=io('http://localhost:3000');
socket.emit('message','hello from the other side');
socket.on('message',(mess)=>{
    console.log(mess)
})