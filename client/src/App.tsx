import MeetingForm from './components/MeetingForm/MeetingForm';
import Transcript from './components/TranscriptContainer/TranscriptContainer';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Recall.ai Transcription Demo</h1>
      </header>
      <MeetingForm />
      <Transcript />
    </div>
  );
};

export default App;
