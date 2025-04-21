const express = require('express');
const router = express.Router();

router.get('/connect', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send an initial connection message
  res.write(
    `data: ${JSON.stringify({ message: 'Connected to event stream' })}\n\n`
  );

  const store = req.app.get('store');
  store.set('client', res);

  req.on('close', () => {
    store.delete('client');
    console.log(`Client disconnected`);
  });
});

module.exports = router;
