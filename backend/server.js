const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const authRoutes = require('./routes/auth-routes');
const transactionRoutes = require("./routes/transaction-routes");
const cookieParser = require('cookie-parser');
const sanitizeUserMiddleware = require('./middleware/sanitize-user-middleware');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Use the user and auth routes
app.use(sanitizeUserMiddleware);
app.use('/api/v1', userRoutes);
app.use('/api/v1', authRoutes);
app.use("/api/v1", transactionRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});