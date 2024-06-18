import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login"
import "../src/css/fonts.css"

import ForgotPass from "./components/ForgotPass";
import Alumni from "./components/Alumni";
import Entrepreneur from "./components/Entrepreneur";
import Companies from "./components/Companies";
import AddData from "./components/AddData";
import CreateUser from "./components/CreateUser";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" >
          <Route index element={<Login />} />
            <Route path="/alumni" element={<Alumni/>} />
            <Route path="/companies" element={<Companies/>} />
            <Route path="/entrepreneurs" element={<Entrepreneur/>} />
            <Route path="/addData" element={<AddData/>} />
            <Route path="/forgotpass" element={<ForgotPass/>} />
            <Route path="/createUser" element={<CreateUser/>} />
            <Route path="/loading" element = {<Loading />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App