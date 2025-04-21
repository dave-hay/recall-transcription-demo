# Recall.ai Real-Time Transcription Demo

This repository demonstrates how to use Recall.ai's real-time transcription feature to:

1. Deploy a bot to join a Google Meet call
2. Transcribe the conversation using Recall's Meeting Captions feature
3. Display the live transcript in a React UI with speaker labels and timestamps

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Recall.ai API key](https://recall.ai)
- [ngrok](https://ngrok.com/) (for local webhook development)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/dave-hay/recall-transcription-demo.git
cd recall-transcription-demo
```

### 2. Set up ngrok for local development

Follow the instructions in the [Local Webhook Development](https://docs.recall.ai/reference/local-webhook-development) documentation to set up ngrok:

1. Create an [ngrok account](https://dashboard.ngrok.com/)
2. Download the [Ngrok CLI](https://ngrok.com/download)
3. Set up a static domain
4. Start a tunnel to expose your local server

```bash
ngrok http --domain your-static-domain.ngrok-free.app 3000
```

### 3. Set up the backend

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file and add your:

- Recall API key
- Recall region (e.g., us-west-2)
- Server URL (your ngrok static domain)

Install dependencies and start the server:

```bash
npm install
npm run dev
```

### 4. Set up the frontend

```bash
cd frontend
cp .env.example .env
```

Install dependencies and start the React app:

```bash
npm install
npm start
```

## Usage

1. Open the React app in your browser (http://localhost:5713)
2. Create a new Google Meet meeting at [meet.new](https://meet.new)
3. Enter the meeting URL in the form and click "Create Bot"
4. Start speaking in the meeting to see real-time transcription

## Key Features

### Backend (Express)

- Creates bots to join meetings using Recall API
- Receives real-time transcription webhooks
- Broadcasts transcription data to frontend via EventSource API

### Frontend (React)

- Form to create a new meeting bot
- Real-time display of transcriptions with speaker labels

## How It Works

1. **Bot Creation**: The frontend form sends a request to the backend to create a new Recall bot.
2. **Webhook Setup**: The backend configures the bot to send real-time transcription webhooks to the ngrok URL.
3. **EventSource API**: When webhooks are received by the backend, they are broadcasted to connected frontend client.
4. **Real-time Display**: The frontend displays transcriptions as they come in, handling both partial and final results.

## Webhook Handling

The backend receives webhook events from Recall.ai at the `/api/webhook/transcript` endpoint. These events are processed and then broadcasted to connected frontend clients using Socket.IO.

## Additional Resources

- [Recall.ai Documentation](https://docs.recall.ai/)
- [Real-Time Transcription Guide](https://docs.recall.ai/reference/real-time-transcription)
