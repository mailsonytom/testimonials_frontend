import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { Axios } from "../../base";
import { DataInput } from "../../Components/Input";

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
          const { accessToken, user_id, user_name, username, cmpName, cmpId } =
            response.data.data;
          localStorage.setItem("TOKEN", accessToken);
          localStorage.setItem("CMP_id", cmpId);
          dispatch({
            type: "setUser",
            payload: {
              accessToken,
              user_id,
              user_name,
              username,
              cmpName,
              cmpId,
            },
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
        <div
          className="col-span-1  p-10 rounded-md"
          style={{ backgroundColor: "#282c34" }}
        >
          <DataInput
            placeholder="Username"
            className="p-5 rounded bg-black	"
            onChange={onUsernameChange}
          />
          <DataInput
            type="password"
            placeholder="Password"
            className="p-5 rounded bg-black	"
            onChange={onPasswordChange}
          />
          <Button
            block
            type="primary"
            // shape="round"
            size="middle"
            className="mt-4"
            onClick={onLogin}
          >
            LOGIN
          </Button>
          <p className=" text-sm text-start text-red-300">
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
