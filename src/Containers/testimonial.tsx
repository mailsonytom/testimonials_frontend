import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import { useAuth } from "../Contexts/AuthContext";
import { Axios } from "../base";

const { TextArea } = Input;

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

  useEffect(() => {
    let id = localStorage.getItem("CMP_id");
    id && setcompId(id);
  }, []);

  const {
    state: { accessToken, cmpId },
    dispatch,
  } = useAuth();

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
