import React from "react";
import './App.css';
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import {Routes, Route} from "react-router-dom";
import ChatContainer from "./components/Chat/ChatContainer";

function App() {
  return (
    <div className="App">
      <SidebarContainer/>
      <div className="content">
        <Routes>
          <Route path="/chat" element={<ChatContainer/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
