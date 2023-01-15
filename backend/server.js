const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

// Routes
app.use('/api/users', require('./routes/userRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
