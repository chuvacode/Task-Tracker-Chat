import React, {useEffect} from "react";
import './App.css';
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import {Route} from "react-router-dom";
import ChatContainer from "./components/Chat/ChatContainer";
import axios from "axios";

function App() {

  let api = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
  });

  useEffect(() => {
    getUser();
  });

  async function getUser() {
    const csfr = await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    });

    const user = await api.post('/api/v1/login', {
      username: 'chyika',
      password: 'password'
    });

    console.log(user);

    const me = await api.get('/api/v1/get-me');
    console.log(me);
  }


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
