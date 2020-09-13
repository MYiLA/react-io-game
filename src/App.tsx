import React from 'react';
import socketio from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

function App() {
  const [state, setState] = React.useState<State>({ players: [] });
  React.useEffect(() => {
    const socket = socketio('//192.168.0.175:3001');
    socket.on('update', setState);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
