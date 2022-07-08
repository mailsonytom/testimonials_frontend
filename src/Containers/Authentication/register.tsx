import React, { useState } from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "./api";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const toLogin = () => {
    return navigate("/login");
  };

  const changeFullName = (e: any) => {
    console.log(e);
    setfullName(e.target.value);
  };

  const changeEmail = (e: any) => {
    setemail(e.target.value);
  };

  const changeUsername = (e: any) => {
    setusername(e.target.value);
  };

  const changePassword = (e: any) => {
    setpassword(e.target.value);
  };

  const registerUser = () => {
    const userData = {
      name: fullName,
      email: email,
      username: username,
      password: password,
    };
    if (
      userData.name &&
      userData.email &&
      userData.username &&
      userData.password
    ) {
        console.log("Inside register go")
    //   dispatch(createNewUser(userData));
    }
  };

  return (
    <header className="App-header">
      <div className="grid grid-cols-2 gap-12">
        <div className="col-span-1 justify-center mt-24">
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
        <div className="col-span-1 bg-slate-200 p-10 rounded-md mr-16">
          <Input
            placeholder="Full Name"
            className="p-5 rounded bg-black"
            onChange={changeFullName}
          />
          <Input
            placeholder="Email"
            className="p-5 rounded bg-black"
            onChange={changeEmail}
          />
          <Input
            placeholder="Username"
            className="p-5 rounded bg-black"
            onChange={changeUsername}
          />
          <Input
            type="password"
            placeholder="Password"
            className="p-5 rounded bg-black"
            onChange={changePassword}
          />
          <Button
            block
            type="primary"
            shape="round"
            size="middle"
            className="mt-6"
            onClick={registerUser}
          >
            REGISTER
          </Button>
          <p className="text-black text-sm text-start">
            Already a user?{" "}
            <Button type="link" size="small" onClick={toLogin}>
              Login
            </Button>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Register;
