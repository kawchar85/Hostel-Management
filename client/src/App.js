import { useState , useEffect} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Axios from 'axios';

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
import StudentHome from "./components/StudentHome";
import AdminReg from "./components/AdminReg";
import ForgotPass from "./components/ForgotPass";
import Complain from "./components/Complain";
import AdminProfile from "./components/AdminProfile";

import { PublicContex } from "./components/PublicContext";

//how to use public data?
//import {useContext } from 'react'
//import { PublicContex } from './PublicContext';
//const [publicData, setPublicData] = useContext(PublicContex);
function App() {

  const [hostelList, setHostelList] = useState([]);
  const [user, setUser] = useState(
    {
      rule_id: -1,
      email: "c@gmail.com"
    }
  );

  //get Hostel list from Database
  const getHostels = () => {
    Axios.get("http://localhost:3001/getData/", { params: { table: "hostel" } }).then((response) => {
      setHostelList(response.data);
      //console.log(response.data);
      setPublicData({...publicData,hostel:response.data});
    });
  };

  useEffect(() => {
    getHostels();
  },[]);


  const [msg, setMsg] = useState("Hello World!");
  //getting info from NavBar.js
  const getData = (info) => {
    setMsg(info);
  };




  const [publicData, setPublicData] = useState(
    {
      user: user,
      hostel: hostelList,
      refresh : false,
      modalShow: []
    }
  );


  return (

    <PublicContex.Provider value={[publicData, setPublicData]}>
      {console.log("Public data: ")}
      {console.log(publicData)}
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
          <Route path="/complain" element={<Complain />} />
          <Route path="/adminreg" element={<AdminReg />} />
          <Route path="/forgotpass" element={<ForgotPass/>} />
          <Route path="/hostel/:hostelId/room/:roomId" element={<Room />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/studenthome" element={<StudentHome />} />
          <Route path="/adminprofile" element={<AdminProfile />} />


          <Route path="*" element={<Error />} />

        </Routes>
        </BrowserRouter>

      </div>
    </PublicContex.Provider>
  );
}

export default App;
