require('dotenv').config();
const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();

const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_URL,
  },
});

// Connect to DB
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// **** ROUTES ****
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
// **** ROUTES ****

// **** SOCKET ****
io.on('connection', (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on('click_like_button', (data) => {
    socket.broadcast.emit('receive_like_data', data);
  });

  socket.on('send_questions_length', (data) => {
    console.log(data);
    socket.broadcast.emit('receive_questions_length', data);
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
