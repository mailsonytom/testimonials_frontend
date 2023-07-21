import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const toLogin = () => {
    return navigate("/login");
  };

  const toRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <div className="text-end mr-4 my-2">
        <Button className="mr-2" type="primary" onClick={toLogin}>
          Login
        </Button>
        <Button type="primary" onClick={toRegister}>
          Register
        </Button>
      </div>
      <div className="App-header">
        <h5 className="text-center text-white">Welcome to TESTIMONIALS</h5>
      </div>
    </div>
  );
};

export default Landing;
