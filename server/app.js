const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authrouter = require("./routes/auth");
const notificationrouter = require("./routes/notification");
const postrouter = require("./routes/post");
const userrouter = require("./routes/user");
const app = express();
const http = require("http"); // Keep http module
// const authRoutes = require('./routes/authRoutes'); // This line is commented out, so it's fine
const chatRoutes = require('./routes/chatRoutes'); // Assuming this handles your regular chat API
const { Server } = require('socket.io');

const authuser = require("./middlewere/auth");
const cors = require('cors');
app.use(cors());
app.use('/uploads', express.static('uploads'));


// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,
  useUnifiedTopology: true,})
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB error:', err));

// Express Routes
app.use("/auth", authrouter);
app.use('/api/chat', chatRoutes); // Regular chat API routes
app.use("/notification", notificationrouter);
app.use("/posts", postrouter);
app.use("/user", userrouter);

app.get('/', (req, res) => {
    res.send('Hello from Express + MongoDB!');
});

// Create the HTTP server using your Express app
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
// Make sure this origin matches your Angular app's URL (e.g., 'http://localhost:4200')
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4200', // <-- CHANGE THIS to your Angular app's actual origin
        methods: ["GET", "POST"]
    }
});

const onlineUsers = new Map();

io.on('connection', socket => {
    console.log('A user connected:', socket.id); // Added for debugging

    socket.on('user-joined', userId => {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} joined, socket ID: ${socket.id}`); // Added for debugging
    });

    socket.on('send-message', async ({ from, to, text }) => {
        const target = onlineUsers.get(to);
        if (target) {
            io.to(target).emit('receive-message', { from, to, text, timestamp: Date.now() });
            console.log(`Message from ${from} to ${to} delivered via socket.`); // Added for debugging
        } else {
            console.log(`User ${to} is not online.`); // Added for debugging
        }
        // also persist to DB
        // Ensure your Message model path is correct
        try {
            const Message = require('./model/Message'); // Load model here if not globally available
            await new Message({ from, to, text }).save();
            console.log(`Message from ${from} to ${to} saved to DB.`); // Added for debugging
        } catch (dbError) {
            console.error('Error saving message to DB:', dbError);
        }
    });

    socket.on('disconnect', () => {
        // Correctly remove the disconnected user from the map
        for (let [userId, sid] of onlineUsers.entries()) { // Use .entries() for iterable pairs
            if (sid === socket.id) {
                onlineUsers.delete(userId);
                console.log(`User ${userId} disconnected. Remaining online users:`, onlineUsers.size); // Added for debugging
                break; // Exit loop once found and deleted
            }
        }
        console.log('User disconnected:', socket.id); // Added for debugging
    });
});

// Start the ONE server instance (the HTTP server that Socket.IO is attached to)
const PORT = process.env.PORT || 5000; // Recommend using 5000 for backend to differentiate from Angular's 4200
server.listen(PORT, () => console.log(`🚀 Server (Express + Socket.IO) running on port ${PORT}`));