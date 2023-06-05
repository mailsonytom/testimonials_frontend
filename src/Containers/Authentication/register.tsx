import React, { useState } from "react";
import { Button, message } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../base";
import { DataInput } from "../../Components/Input";
import Logo from "../../Assets/userlovelogo.png";

type RegisterUserPayload = {
  fullName: string;
  cmpName: string;
  username: string;
  password?: string;
};

interface FormErrors {
  fullName?: string;
  username?: string;
  cmpName?: string;
  password?: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setfullName] = useState("");
  const [cmpName, setcmpName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [messageApi, contextHolder] = message.useMessage();

  const toLogin = () => {
    return navigate("/login");
  };

  const validateForm = () => {
    const errors: FormErrors = {};

    // Validate name
    if (!fullName.trim()) {
      errors.fullName = "Name is required";
    }

    // Validate username (email)
    if (!username.trim()) {
      errors.username = "Username is required";
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      errors.username = "Username (email) is invalid";
    }

    // Validate company name
    if (!cmpName.trim()) {
      errors.cmpName = "Company name is required";
    }

    // Validate password
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }

    return errors;
  };

  const changeFullName = (e: any) => {
    setfullName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, fullName: "" }));
  };

  const changeCmpName = (e: any) => {
    setcmpName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, cmpName: "" }));
  };

  const changeUsername = (e: any) => {
    setusername(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
  };

  const changePassword = (e: any) => {
    setpassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
  };

  const successAlert = () => {
    messageApi.open({
      type: "success",
      content: "Registration Successfull",
      className: "custom-class",
      style: {
        textAlign: "right",
        marginTop: "2vh",
        marginRight: "2vh",
      },
      duration: 2,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const errorAlert = () => {
    messageApi.open({
      type: "error",
      content: "Please fill the details correctly",
      className: "custom-class",
      style: {
        textAlign: "right",
        marginTop: "2vh",
        marginRight: "2vh",
      },
      duration: 5,
    });
  };

  const registerUser = () => {
    const payload: RegisterUserPayload = {
      fullName,
      cmpName,
      username,
      password,
    };

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      Axios.post("/register", payload)
        .then((response) => {
          if (response.data.msg === "User registered") {
            successAlert();
          }
        })
        .catch((err) => {
          console.log(err || err.response);
        });
    } else {
      setErrors(errors);
      errorAlert();
    }
  };

  return (
    <header className="App-header">
      <div className="grid grid-cols-2 gap-12 flex justify-center items-center">
        <div className="col-span-1 text-center mx-auto">
          <img src={Logo} alt="logo" width="250px" className="rounded-full" />
        </div>
        <div
          className="col-span-1 p-10 rounded-md w-11/12"
          style={{ backgroundColor: "#282c34" }}
        >
          <div>
            <DataInput
              placeholder="Full Name"
              className="p-5 rounded bg-black"
              onChange={changeFullName}
            />
            {errors.fullName && (
              <span className="text-red-600 text-sm	text-left p-1">
                {errors.fullName}
              </span>
            )}
            <DataInput
              placeholder="Company Name"
              className="p-5 rounded bg-black"
              onChange={changeCmpName}
            />
            {errors.cmpName && (
              <span className="text-red-600 text-sm	text-left p-1">
                {errors.cmpName}
              </span>
            )}
            <DataInput
              placeholder="Username"
              className="p-5 rounded bg-black"
              onChange={changeUsername}
            />
            {errors.username && (
              <span className="text-red-600 text-sm	text-left p-1">
                {errors.username}
              </span>
            )}
            <DataInput
              type="password"
              placeholder="Password"
              className="p-5 rounded bg-black"
              onChange={changePassword}
            />
            {errors.password && (
              <span className="text-red-600 text-sm	text-left p-1">
                {errors.password}
              </span>
            )}
          </div>
          {contextHolder}
          <Button
            block
            type="primary"
            size="middle"
            className="rounded mt-4"
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
