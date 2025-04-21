import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../../config';
import './MeetingForm.css';

const MeetingForm = () => {
  const [meetingUrl, setMeetingUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBotCreated, setIsBotCreated] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!meetingUrl.startsWith('https://meet.google.com/')) {
        throw new Error('Must use valid Google Meet URL.');
      }

      await axios.post(`${API_URL}/api/bot`, { meetingUrl });
      setIsBotCreated(true);
    } catch (error) {
      console.log('Error creating bot:', error);
      setIsBotCreated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="meeting-form">
      <input
        type="text"
        className="meeting-form-input"
        value={meetingUrl}
        onChange={(e) => setMeetingUrl(e.target.value)}
        placeholder="https://meet.google.com/xxx-xxxx-xxx"
        disabled={isLoading || isBotCreated}
        required
      />
      <button
        type="submit"
        className="meeting-form-button"
        disabled={isLoading || isBotCreated}
      >
        {isLoading ? 'Connecting...' : 'Connect'}
      </button>
    </form>
  );
};

export default MeetingForm;
