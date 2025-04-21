const express = require('express');

const router = express.Router();

// Webhook endpoint for receiving real-time transcription
// https://docs.recall.ai/docs/real-time-transcription#events
router.post('/transcript', (req, res) => {
  const store = req.app.get('store');
  const client = store.get('client');

  try {
    const joinAt = store.get('join_at');

    const { event, data } = req.body;

    if (['transcript.data'].includes(event)) {
      const { words, participant } = data.data;
      const { text, start_timestamp } = words[0];
      const relativeTimestamp = start_timestamp.relative;

      const timestamp = new Date(joinAt);
      timestamp.setSeconds(timestamp.getSeconds() + relativeTimestamp);

      const transcriptData = {
        text,
        timestamp,
        user: participant.name || participant.id,
      };

      client.write(`data: ${JSON.stringify(transcriptData)}\n\n`);
    }

    res.status(200).end();
  } catch (error) {
    const errorData = { error: error.message || 'Failed to process webhook' };
    client.write(`data: ${JSON.stringify(errorData)}\n\n`);

    return res.status(200).end();
  }
});

module.exports = router;
