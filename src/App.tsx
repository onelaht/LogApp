// react
import React from 'react';
// split components
import LogLayout from "./LogApp/LogLayout";
// styling
import "./App.css"
import LogToolbar from "./LogApp/LogToolbar";

function App() {
  return (
      <div className="Container">
          <div className="Toolbar"><LogToolbar/></div>
          <div className="Layout"><LogLayout/></div>
      </div>
  );
}

export default App;
