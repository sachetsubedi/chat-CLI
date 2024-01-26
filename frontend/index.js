// import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
const socket=io('http://localhost:3000');
// socket.emit('message','hello from the other side');

const messageContainer=document.getElementById('messageContainer');

const addChatItem=(userName,message,textColor)=>{
    // console.log(message);
    const newLi=document.createElement('li');
    newLi.innerText=`${userName}->${message}`;
    newLi.style.color=textColor;
    newLi.style.fontWeight='bold';
    document.getElementById('messageContainer').append(newLi);
    messageContainer.scrollTop=(messageContainer.scrollHeight);
}
// get messages
socket.on('message',({userName,message})=>{
    addChatItem(userName,message,'red');
})

// user connected alert
socket.on('connected',(userName)=>{
    addChatItem(userName,'Connected','lime');
})

// on rename
socket.on('rename',({oldUsername,userName})=>{
    console.log(userName);
    addChatItem(userName,`${oldUsername} changed their username to ${userName}`,"green");
    inputBox.value='';
})

// input always in focuss
const inputBox=document.getElementById('inputBox');
document.body.addEventListener('click',()=>{
    inputBox.focus();
})

document.body.addEventListener('keydown',(e)=>{
    if(e.key==="Enter"){
        const message=document.getElementById('inputBox').value;

        // rename
        if(message.startsWith('/rename')){
            const userName=message.slice('/rename '.length);
            socket.emit('rename',userName);
        }
        else{
        sendMessage(message);
        // clear input
        messageContainer.scrollTop=(messageContainer.scrollHeight);
        inputBox.value='';
        }
    }
})

const sendMessage=(message)=>{
    socket.emit('message',message);
}