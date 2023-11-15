import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import Login from "./components/Login";
import Home from "./components/Home";
import "./style.css";
import UiDesign from "./components/UiDesign"
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Project from "./components/Projects";
import Review from "./components/Reviews";
import Privatecom from "./components/Private";
import Calendar from "./components/Calender";
import Developer from "./components/Developer";
import Dev from "./components/UpdateDelEmp"


function App() {
  return (
    <>
      <Router>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Privatecom />}>
            <Route index element={<Home />} />
            <Route path="/dev" element={<Developer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project" element={<Project />} />
            <Route path="/review" element={<Review />} />
            <Route path="/blog-post" element={<Blog />} />
            <Route path="/calender" element={<Calendar />} />
            <Route path="/ui" element={<UiDesign />} />
           

          </Route>
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
