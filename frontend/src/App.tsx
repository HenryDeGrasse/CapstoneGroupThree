import React, { useState } from 'react';
import './App.css';
import GameSettingsProvider from './GameSettingProvider';
import Main from './Pages/Main';
import LandingPage from './Pages/LandingPage';

function App() {
  const [showMain, setShowMain] = useState(false);

  const toggleShowMain = () => setShowMain((prevShowMain) => !prevShowMain);

  return (
    <>
      <GameSettingsProvider>
        {showMain ? (
          <Main />
        ) : (
          <LandingPage onClick={toggleShowMain} />
        )}
      </GameSettingsProvider>
    </>
  );
}

export default App;
