import React from "react";
import './App.css';
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import {Route} from "react-router-dom";
import ChatContainer from "./components/Chat/ChatContainer";

function App() {
  return (
    <div className="App">
      <SidebarContainer/>
      <div className="content">
        <Route path="/chat/:id?" render={
          () => {
            return <ChatContainer/>
          }
        }/>
      </div>
    </div>
  );
}

export default App;
