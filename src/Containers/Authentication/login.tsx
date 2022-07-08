import React from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const toRegister = () => {
    navigate("/register");
  };

  return (
    <header className="App-header">
      <div className="grid grid-cols-2 gap-12">
        <div className="col-span-1 justify-center mt-16">
          <span
            className="
              	font-serif
                	text-2xl
                   font-bold
                    tracking-widest
                    text-red-300	
                    	uppercase"
          >
            TESTIMONIALS
          </span>
        </div>
        <div className="col-span-1 bg-slate-200 p-10 rounded-md">
          <Input placeholder="Username" className="p-5 rounded bg-black	" />
          <Input
            type="password"
            placeholder="Password"
            className="p-5 rounded bg-black	"
          />
          <Button
            block
            type="primary"
            shape="round"
            size="middle"
            className="mt-6"
          >
            LOGIN
          </Button>
          <p className="text-black text-sm text-start">
            Not a user?{" "}
            <Button type="link" size="small" onClick={toRegister}>
              Register
            </Button>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Login;
