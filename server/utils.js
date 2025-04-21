const botTimestamps = new Map();

const storeBotTimestamp = (botId, joinAt) => botTimestamps.set(botId, joinAt);

const getBotTimestamp = (botId) => botTimestamps.get(botId);

// Calculate absolute timestamp by combining join_at and relative timestamp
const calculateAbsoluteTimestamp = (botId, relativeTimestamp) => {
  const joinAt = getBotTimestamp(botId);

  if (!joinAt) {
    console.warn(`No join_at timestamp found for bot ${botId}`);
    return relativeTimestamp;
  }

  const joinAtDate = new Date(joinAt);

  const absoluteDate = new Date(joinAtDate.getTime() + relativeTimestamp);

  return absoluteDate.toISOString();
};

module.exports = {
  storeBotTimestamp,
  getBotTimestamp,
  calculateAbsoluteTimestamp,
};
