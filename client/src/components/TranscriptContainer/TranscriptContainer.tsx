import { useEffect, useState } from 'react';
import TranscriptItem from '../TranscriptItem/TranscriptItem';
import { API_URL } from '../../config';
import './TranscriptContainer.css';

export type TTranscriptEvent = {
  text: string;
  timestamp: number;
  user: string;
  error?: string;
};

const Transcript = () => {
  const [transcripts, setTranscripts] = useState<TTranscriptEvent[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/api/events/connect`);

    eventSource.onmessage = (event) => {
      const transcriptData = JSON.parse(event.data) as TTranscriptEvent;

      if (transcriptData.error) {
        console.error(transcriptData.error);
      } else if (transcriptData.text) {
        setTranscripts((prev) => [...prev, transcriptData]);
      }
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  return (
    <div className="transcript-container">
      <h2>Live Transcript</h2>
      <div className="transcript-content">
        {transcripts.length === 0 ? (
          <div className="empty-transcript">
            <p>No transcriptions yet.</p>
          </div>
        ) : (
          transcripts.map((event, index) => (
            <TranscriptItem key={`${event.timestamp}-${index}`} {...event} />
          ))
        )}
      </div>
    </div>
  );
};

export default Transcript;
