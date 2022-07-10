import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { Axios } from "../../base";

type LoginPayload = {
  username: string;
  password?: string;
};

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const {
    state: { accessToken },
    dispatch,
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [dispatch]);

  const toRegister = () => {
    navigate("/register");
  };

  const onUsernameChange = (e: any) => {
    setusername(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    setpassword(e.target.value);
  };

  const onLogin = () => {
    const payload: LoginPayload = {
      username,
      password,
    };
    Axios.post("/login", payload)
      .then((response) => {
        console.log("login response::", response.data);
        if (response.data.data) {
          const { accessToken, user_id, user_name, username } =
            response.data.data;
          localStorage.setItem("TOKEN", accessToken);
          dispatch({
            type: "setUser",
            payload: { accessToken, user_id, user_name, username },
          });
          navigate("/dashboard");
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
          <Input
            placeholder="Username"
            className="p-5 rounded bg-black	"
            onChange={onUsernameChange}
          />
          <Input
            type="password"
            placeholder="Password"
            className="p-5 rounded bg-black	"
            onChange={onPasswordChange}
          />
          <Button
            block
            type="primary"
            shape="round"
            size="middle"
            className="mt-6"
            onClick={onLogin}
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
