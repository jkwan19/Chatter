import { io } from "socket.io-client";

const URL = "http://localhost:3000";

const socket = io(URL, {
    autoConnect: false,
});

socket.on("typing", (user) => {
    console.log(`${user} is typing`)
});

socket.on('chat', message => {
    console.log('From server: ', message)
})

export default socket;