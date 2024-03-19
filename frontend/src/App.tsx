import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameSettingsProvider from './GameSettingProvider';
import Main from './Pages/Main'; 

function App() {
  return (
   <>
   <GameSettingsProvider>
    <Main/>
    </GameSettingsProvider>

   </>
  );
}

export default App;
