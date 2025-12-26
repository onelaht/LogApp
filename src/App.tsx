// react
import React from 'react';
// styling
import "./App.css"
// split components
import LogLayout from "./Logs/LogLayout";
// global vars
import ProviderApp from "./Providers/ProviderApp";

function AppInner() {
  return (
      <div className="Container">
          <div className="Layout"><LogLayout/></div>
      </div>
  );
}

export default function App() {
    return (
        <ProviderApp>
            <AppInner/>
        </ProviderApp>
    )
}
