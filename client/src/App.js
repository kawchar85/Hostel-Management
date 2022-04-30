import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Hostel from './components/Hostel';
import Login from './pages/Login';
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import Error from "./components/Error";
import Room from "./components/Room";
import Administration from "./components/Administration";


function App() {

  const [msg, setMsg] = useState("Hello World!");

  //getting info from NavBar.js
  const getData = (info) => {
    setMsg(info);
  };

  return (
    <div className="App">
      <NavBar info={getData} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/hostel/:id" element={<Hostel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/hostel/:hostelId/room/:roomId" element={<Room />} />
          <Route path="/administration" element={<Administration />} />


          <Route path="*" element={<Error />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
