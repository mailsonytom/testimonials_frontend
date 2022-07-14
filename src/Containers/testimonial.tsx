import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
// import { useAuth } from "../Contexts/AuthContext";
import { Axios } from "../base";
import { useLocation } from "react-router-dom";

const { TextArea } = Input;
var CryptoJS = require("crypto-js");
const secretKey = process.env.REACT_APP_MY_SECRET_KEY;

type TestimonialPayload = {
  fullName: string;
  email: string;
  compId: string;
  text: string;
};

const GetTestimonial = () => {
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [compId, setcompId] = useState("");
  const [text, settext] = useState("");
  const [mount, setmount] = useState("initial");

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get("cmp");
    const NewId = id && id.replaceAll(" ", "+");
    var bytesData =
      NewId &&
      CryptoJS.AES.decrypt(NewId, secretKey).toString(CryptoJS.enc.Utf8);
    var decryptedData = JSON.parse(bytesData);

    decryptedData && setcompId(decryptedData);
  }, [mount]);

  // const {
  //   state: { accessToken, cmpId },
  //   dispatch,
  // } = useAuth();

  const onChangeFullName = (e: any) => {
    setfullName(e.target.value);
  };

  const onChangeEmail = (e: any) => {
    setemail(e.target.value);
  };

  const onChangeText = (e: any) => {
    settext(e.target.value);
  };

  const sendTestimonial = () => {
    console.log(compId);
    const payload: TestimonialPayload = {
      fullName,
      email,
      compId,
      text,
    };
    if (payload.compId && payload.text) {
      Axios.post("/addtestimonial", payload)
        .then((response) => {
          console.log("Testimonial response::", response.data);
          if (response.data.msg === "done") {
            return alert("Testimonial added successfully");
          }
        })
        .catch((err) => {
          console.log(
            err || err.response
            // || "Unable to login. Check your credentials."
          );
        });
    } else {
      console.log("Something wrong!!");
    }
  };

  return (
    <header className="App-header">
      <div className="place-content-center bg-slate-200 p-10 rounded-md">
        <h3>Create Your Testimonial</h3>
        <Input
          placeholder="FullName"
          className="p-5 rounded bg-black	"
          onChange={onChangeFullName}
        />
        <Input
          type="text"
          placeholder="Email"
          className="p-5 rounded bg-black	"
          onChange={onChangeEmail}
        />
        <TextArea
          rows={4}
          placeholder="Add your testimonial"
          className="p-5 rounded bg-black"
          onChange={onChangeText}
        />
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
