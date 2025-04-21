import { formatTimestamp } from '../../utils';
import type { TTranscriptEvent } from '../TranscriptContainer/TranscriptContainer';
import './TranscriptItem.css';

const TranscriptItem = ({ text, timestamp, user }: TTranscriptEvent) => {
  const userInitial = user.charAt(0).toUpperCase();

  return (
    <div className="transcript-item">
      <div className="transcript-item-header">
        <div className="user-info">
          <div className="user-avatar">{userInitial}</div>
          <span className="user-name">{user}</span>
        </div>
        <span className="timestamp">{formatTimestamp(timestamp)}</span>
      </div>
      <div className="transcript-text">{text}</div>
    </div>
  );
};

export default TranscriptItem;
