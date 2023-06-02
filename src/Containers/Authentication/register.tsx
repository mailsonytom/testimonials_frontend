import React, { useState } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../base";
import { DataInput } from "../../Components/Input";

type RegisterUserPayload = {
  fullName: string;
  cmpName: string;
  username: string;
  password?: string;
};

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setfullName] = useState("");
  const [cmpName, setcmpName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [isUser, setisUser] = useState(true);

  const toLogin = () => {
    return navigate("/login");
  };

  const changeFullName = (e: any) => {
    setfullName(e.target.value);
  };

  const changeCmpName = (e: any) => {
    setcmpName(e.target.value);
  };

  const changeUsername = (e: any) => {
    setusername(e.target.value);
  };

  const changePassword = (e: any) => {
    setpassword(e.target.value);
  };

  const successAlert = () => {
    return alert("Registration successfull");
  };

  const registerUser = () => {
    const payload: RegisterUserPayload = {
      fullName,
      cmpName,
      username,
      password,
    };
    Axios.post("/register", payload)
      .then((response) => {
        if (response.data.msg === "User registered") {
          successAlert();
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(
          err || err.response
          // || "Unable to login. Check your credentials."
        );
      });
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
        <div
          className="col-span-1 p-10 rounded-md mr-16"
          style={{ backgroundColor: "#282c34" }}
        >
          <div>
            <DataInput
              placeholder="Full Name"
              className="p-5 rounded bg-black"
              onChange={changeFullName}
            />
            <DataInput
              placeholder="Company Name"
              className="p-5 rounded bg-black"
              onChange={changeCmpName}
            />
            <DataInput
              placeholder="Username"
              className="p-5 rounded bg-black"
              onChange={changeUsername}
            />
            <DataInput
              type="password"
              placeholder="Password"
              className="p-5 rounded bg-black"
              onChange={changePassword}
            />
          </div>
          <Button
            block
            type="primary"
            // shape="round"
            size="middle"
            className="mt-4"
            onClick={registerUser}
          >
            REGISTER
          </Button>
          <p className="text-red-300 text-sm text-start">
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
