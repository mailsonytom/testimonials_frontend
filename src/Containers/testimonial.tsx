import React, { useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import "antd/dist/antd.css";
import { Axios } from "../base";
import { useLocation } from "react-router-dom";
import { DataInput, DataTextArea } from "../Components/Input";

const { TextArea } = Input;
var CryptoJS = require("crypto-js");
const secretKey = process.env.REACT_APP_MY_SECRET_KEY;

type TestimonialPayload = {
  fullName: string;
  email: string;
  compId: string;
  cmpName: string;
  // avatar: string;
  text: string;
};

interface FormErrors {
  fullName?: string;
  email?: string;
  text?: string;
}

const GetTestimonial = () => {
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [compId, setcompId] = useState("");
  const [text, settext] = useState("");
  const [mount, setmount] = useState("initial");
  const [cmpName, setcmpName] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [messageApi, contextHolder] = message.useMessage();

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get("cp");
    const NewId = id && id.replaceAll(" ", "+");
    var bytesData =
      NewId &&
      CryptoJS.AES.decrypt(NewId, secretKey).toString(CryptoJS.enc.Utf8);
    var decryptedData = JSON.parse(bytesData);

    decryptedData && setcompId(decryptedData);
  }, [mount]);

  const validateForm = () => {
    const errors: FormErrors = {};

    // Validate name
    if (!fullName.trim()) {
      errors.fullName = "Name is required";
    }

    // Validate username (email)
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    // Validate password
    if (!text) {
      errors.text = "Testimonial is required";
    }

    return errors;
  };

  const onChangeFullName = (e: any) => {
    setfullName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, fullName: "" }));
  };

  const onChangeEmail = (e: any) => {
    setemail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  };

  const onChangeCmpName = (e: any) => {
    setcmpName(e.target.value);
  };

  const onChangeText = (e: any) => {
    settext(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, text: "" }));
  };

  const successAlert = () => {
    messageApi.open({
      type: "success",
      content: "Testimonial added Successfull",
      className: "custom-class",
      style: {
        textAlign: "right",
        marginTop: "2vh",
        marginRight: "2vh",
      },
      duration: 3,
    });
  };

  const errorAlert = (errorData: any) => {
    messageApi.open({
      type: "error",
      content: errorData,
      className: "custom-class",
      style: {
        textAlign: "right",
        marginTop: "2vh",
        marginRight: "2vh",
      },
      duration: 5,
    });
  };

  const sendTestimonial = () => {
    const payload: TestimonialPayload = {
      fullName,
      email,
      compId,
      cmpName,
      text,
    };
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      if (payload.compId) {
        Axios.post("/addtestimonial", payload)
          .then((response) => {
            console.log("Testimonial response::", response.data);
            if (response.data.msg === "done") {
              return successAlert();
            }
          })
          .catch((err) => {
            console.log(
              err || err.response
              // || "Unable to login. Check your credentials."
            );
          });
      } else {
        errorAlert("Something went wrong!");
      }
    } else {
      setErrors(errors);
      errorAlert("Please fill the details correctly");
    }
  };

  return (
    <header className="App-header">
      <div
        className="place-content-center bg-slate-200 p-10 rounded-md w-3/5"
        style={{ backgroundColor: "#282c34" }}
      >
        <h3 className="text-white text-center">Portray Your Love</h3>
        <DataInput placeholder="Full Name" onChange={onChangeFullName} />
        {errors.fullName && (
          <span className="text-red-600 text-sm	text-left p-1">
            {errors.fullName}
          </span>
        )}
        <DataInput type="text" placeholder="Email" onChange={onChangeEmail} />
        {errors.email && (
          <span className="text-red-600 text-sm	text-left p-1">
            {errors.email}
          </span>
        )}
        <DataInput
          type="text"
          placeholder="Company Name"
          onChange={onChangeCmpName}
        />
        <DataTextArea
          rows={4}
          placeholder="Add your testimonial"
          onChange={onChangeText}
        />
        {errors.text && (
          <span className="text-red-600 text-sm	text-left p-1">
            {errors.text}
          </span>
        )}
        {contextHolder}
        <Button
          block
          type="primary"
          shape="round"
          size="middle"
          className="mt-4"
          onClick={sendTestimonial}
        >
          SEND
        </Button>
      </div>
    </header>
  );
};

export default GetTestimonial;
