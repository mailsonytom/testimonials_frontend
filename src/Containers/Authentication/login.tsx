import React, { useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { Axios } from "../../base";
import { DataInput } from "../../Components/Input";
import Logo from "../../Assets/userlovelogo.png";
import { GoogleLogin } from "@react-oauth/google";

type LoginPayload = {
  username: string;
  password?: string;
};

interface FormErrors {
  username?: string;
  password?: string;
}

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [messageApi, contextHolder] = message.useMessage();

  const {
    state: { accessToken },
    dispatch,
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const accesstoken = localStorage.getItem("TOKEN");
    if (accesstoken) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validateForm = () => {
    const errors: FormErrors = {};

    // Validate username (email)
    if (!username.trim()) {
      errors.username = "Username is required";
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      errors.username = "Username (email) is invalid";
    }

    // Validate password
    if (!password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const toRegister = () => {
    navigate("/register");
  };

  const onUsernameChange = (e: any) => {
    setusername(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
  };

  const onPasswordChange = (e: any) => {
    setpassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
  };

  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };

  const successAlert = () => {
    messageApi.open({
      type: "success",
      content: "Login Successfull",
      className: "custom-class",
      style: {
        textAlign: "right",
        marginTop: "2vh",
        marginRight: "2vh",
      },
      duration: 2,
    });
    navigate("/dashboard");
  };

  const errorAlert = (errorMsg: any) => {
    messageApi.open({
      type: "error",
      content: errorMsg,
      className: "custom-class",
      style: {
        textAlign: "right",
        marginTop: "2vh",
        marginRight: "2vh",
      },
      duration: 5,
    });
  };

  const onLogin = () => {
    const payload: LoginPayload = {
      username,
      password,
    };
    var Headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      Axios.post("/login", payload, { headers: Headers })
        .then((response) => {
          if (response.data.data) {
            const {
              accessToken,
              user_id,
              user_name,
              username,
              cmpName,
              cmpId,
            } = response.data.data;
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
            successAlert();
          } else {
            return errorAlert(response.data.msg);
          }
        })
        .catch((err) => {
          console.log(err || err.response);
        });
    } else {
      setErrors(errors);
      errorAlert("Please fill the details correctly");
    }
  };

  return (
    <header className="App-header">
      <div className="grid grid-cols-2 gap-12 flex justify-center items-center">
        <div className="col-span-1 text-center mx-auto">
          <img src={Logo} alt="logo" width="250px" className="rounded-full" />
        </div>
        <div
          className="col-span-1 p-10 rounded-md w-full"
          style={{ backgroundColor: "#282c34" }}
        >
          <GoogleLogin onSuccess={responseMessage} />
          <hr className="mt-4 border-dotted" />
          <label htmlFor="" className="text-sm px-2">
            Email
          </label>
          <DataInput
            placeholder="Enter your email"
            className="p-5 rounded bg-black	"
            onChange={onUsernameChange}
          />
          {errors.username && (
            <span className="text-red-600 text-sm	text-left p-1">
              {errors.username}
            </span>
          )}
          <label htmlFor="" className="text-sm px-2">
            Password
          </label>
          <DataInput
            type="password"
            placeholder="Password"
            className="p-5 rounded bg-black	"
            onChange={onPasswordChange}
          />
          {errors.password && (
            <span className="text-red-600 text-sm	text-left p-1">
              {errors.password}
            </span>
          )}
          {contextHolder}
          <Button
            block
            type="primary"
            size="middle"
            className="rounded p-5 mt-4 text-lg"
            onClick={onLogin}
          >
            SIGN IN
          </Button>
          <p className=" text-sm text-start text-red-300">
            Don't have an account?{" "}
            <Button type="link" size="small" onClick={toRegister}>
              Sign up
            </Button>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Login;
