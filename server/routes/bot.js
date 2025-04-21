const express = require('express');
const config = require('../config');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const store = req.app.get('store');

    const { meetingUrl, botName } = req.body;

    // https://beta-docs.recall.ai/docs/bot-real-time-transcription#configuration
    const response = await axios.post(
      `https://${config.recallRegion}.recall.ai/api/v1/bot/`,
      {
        meeting_url: meetingUrl,
        bot_name: botName || 'My Bot',
        recording_config: {
          transcript: {
            provider: {
              meeting_captions: {},
            },
          },
          realtime_endpoints: [
            {
              type: 'webhook',
              url: `${config.serverUrl}/api/webhook/transcript`,
              events: ['transcript.data'],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `${config.recallApiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    const { join_at } = response.data;

    store.set('join_at', join_at);

    res.status(201).send();
  } catch (error) {
    const message = 'Failed to create bot';
    const data = error.response?.data;

    console.log(message, error);
    res.status(500).json({ message, data });
  }
});

module.exports = router;
