const express = require('express');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

// CORS
const whitelist = [process.env.FRONT_URL];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Connect to DB
connectDB();

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// **** ROUTES ****
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
// **** ROUTES ****

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
