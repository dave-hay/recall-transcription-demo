const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const config = require('./config');

dotenv.config();

const app = express();

app.use(
  cors({
    origin: config.frontendUrl,
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(bodyParser.json());

const store = new Map();
app.set('store', store);

// routes
const botRoutes = require('./routes/bot');
const webhookRoutes = require('./routes/webhook');
const sseRoutes = require('./routes/sse');

app.use('/api/bot', botRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/events', sseRoutes);

app.listen(3000, () => console.log('listening on *:3000'));
