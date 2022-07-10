import React, { useEffect } from "react";
import "./App.css";
import Login from "./Containers/Authentication/login";
import Register from "./Containers/Authentication/register";
import Landing from "./Containers/Landing/landing";
import Dashboard from "./Containers/Dashboard/dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GetTestimonial from "./Containers/testimonial";
import { useAuth } from "./Contexts/AuthContext";

function App() {
  const { dispatch } = useAuth();

  useEffect(() => {
    const tokenFromLS = localStorage.getItem("PLTOKEN");
    if (tokenFromLS) {
      dispatch({ type: "setToken", payload: { accessToken: tokenFromLS } });
    }
  }, [dispatch]);

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
