const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const authRoutes = require('./routes/auth-routes');
const betRoutes = require('./routes/bet-routes');
const cookieParser = require('cookie-parser');
const removeBalanceMiddleware = require('./middleware/remove-balance-middleware');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Use the user and auth routes
app.use('/api/v1/users', removeBalanceMiddleware, userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/bets", betRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});