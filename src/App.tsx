// react
import React from 'react';
// styling
import "./App.css"
// split components
import LogLayout from "./Logs/LogLayout";
import ProviderApp from "./Providers/ProviderApp";
import LogFetcher from "./Logs/LogFetcher";
// global vars
import {useFetcher} from "./Providers/ProviderFetcher";

function AppInner() {
    const {fetched} = useFetcher();

  return (
      <>
          {fetched ?
              <div className="Container">
                  <div className="Layout"><LogLayout/></div>
              </div> :
              <div className="Container">
                <div className="Layout"><LogFetcher/></div>
              </div>
          }
      </>
  );
}

export default function App() {
    return (
        <ProviderApp>
            <AppInner/>
        </ProviderApp>
    )
}
