import React, { useEffect, useState } from "react";
import { Input, Button, Upload } from "antd";
import "antd/dist/antd.css";
// import { useAuth } from "../Contexts/AuthContext";
import { Axios } from "../base";
import { useLocation } from "react-router-dom";
// import ImgCrop from "antd-img-crop";
// import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { DataInput, DataTextArea } from "../Components/Input";

const { TextArea } = Input;
var CryptoJS = require("crypto-js");
const secretKey = process.env.REACT_APP_MY_SECRET_KEY;

type TestimonialPayload = {
  fullName: string;
  email: string;
  compId: string;
  companyURL: string;
  // avatar: string;
  text: string;
};

const GetTestimonial = () => {
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [compId, setcompId] = useState("");
  const [text, settext] = useState("");
  const [mount, setmount] = useState("initial");
  const [companyURL, setcompanyURL] = useState("");
  // const [file, setFile] = useState<UploadFile[]>([]);

  // const onChangeImage: UploadProps["onChange"] = ({ fileList: newFile }) => {
  //   setFile(newFile);
  //   console.log(file);
  // };

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

  const onChangeURL = (e: any) => {
    setcompanyURL(e.target.value);
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
      companyURL,
      text,
    };
    // payload.avatar = file[0].name;
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
        <DataInput placeholder="Full Name" onChange={onChangeFullName} />
        <DataInput type="text" placeholder="Email" onChange={onChangeEmail} />
        <DataInput
          type="text"
          placeholder="Company URL"
          onChange={onChangeURL}
        />
        {/* <div className="col-span-1">
            <ImgCrop rotate>
              <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={file}
                onChange={onChangeImage}
                // onPreview={onPreviewImage}
              >
                {file.length < 1 && "Upload"}
              </Upload>
            </ImgCrop>
          </div> */}

        <DataTextArea
          rows={4}
          placeholder="Add your testimonial"
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
