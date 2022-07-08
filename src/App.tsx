import React from "react";
import "./App.css";
import Login from "./Containers/Authentication/login";
import Register from "./Containers/Authentication/register";
import Landing from "./Containers/Landing/landing";
import Dashboard from "./Containers/Dashboard/dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GetTestimonial from "./Containers/testimonial";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="" element={<Navigate to={"/"} />} /> */}
          <Route path="" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/getdata" element={<GetTestimonial />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
