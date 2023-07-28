const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:8080"],
    }
})

// const roomInfo = io.of("/room")

// roomInfo.on("connection", socket => {
//     console.log("connetion to room infomation")
//     console.log(io.sockets.adapter.rooms)
// })



io.on("connection", socket => {
    console.log(socket.id)
    // socket.on('custom-event', (number, string, obj)=>{
    //     console.log(number, string, obj)
    // })
    socket.on('send-message', (message, room)=>{
        if(room === ''){
            socket.broadcast.emit("receive-message", message)
        } else{
            socket.to(room).emit("receive-message", message)
        }
    })

    socket.on('join-room', (room, cb)=>{
        socket.join(room)
        cb(`Joined ${room}`)
        

    })

    socket.on("all-room-info", (socketId, cb)=>{
        roomInfo = Array.from(io.sockets.adapter.rooms.keys())
        console.log(roomInfo)

        // socket.to(socketId).emit("all-room-info". roomInfo)
        cb(roomInfo)
        

    })
})