//App.tsx

import React, { useState } from 'react';
import Board from './components/Board/Board';
import './App.css';


const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Force Four</h1>
      {/* <Board numRows={6} numCols={7} /> */}
      <Board  />

    </div>
  );
};

export default App;
