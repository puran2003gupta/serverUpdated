const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let currentPage = 1;

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send current page to the newly connected user
    socket.emit('pageChange', currentPage);

    // Listen for admin page change event
    socket.on('changePage', (page) => {
        currentPage = page;
        io.emit('pageChange', currentPage); // Broadcast to all users
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(5050, () => {
    console.log('Server is running on port 5050');
});
