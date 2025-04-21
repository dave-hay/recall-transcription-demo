const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  recallApiKey: process.env.RECALLAI_API_KEY,
  recallRegion: process.env.RECALLAI_REGION,
  serverUrl: process.env.SERVER_URL,
  frontendUrl: process.env.FRONTEND_URL,
};
