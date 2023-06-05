import React, { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../base";
import "antd/dist/antd.css";
import CodeEditor from "@uiw/react-textarea-code-editor";
import NavigationBar from "../Navigation";
import TestimonialCard from "../../Components/TestimonialCard";
import { message } from "antd";

var CryptoJS = require("crypto-js");
const secretKey = process.env.REACT_APP_MY_SECRET_KEY;
const backendURL = process.env.REACT_APP_BACKEND;

const Dashboard = () => {
  const [, setcompany] = useState("");
  const [customerDetails, setcustomerDetails] = useState<{
    data: string[];
  }>(() => ({
    data: [],
  }));
  const [copiedText, setCopiedText] = useState("");

  const [cipherText, setcipherText] = useState("");
  const [code, setCode] = React.useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const {
    state: { accessToken, cmpId },
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    } else {
      const Comp_id = cmpId || localStorage.getItem("CMP_id");
      const payload = {
        CMP: Comp_id,
      };

      Axios.post("/getAll", payload).then((response) => {
        setcustomerDetails({ data: [] });
        setcompany(response.data.data.company);
        setcustomerDetails({ data: response.data.data.Customers });
      });
      setcipherText(
        CryptoJS.AES.encrypt(JSON.stringify(Comp_id), secretKey).toString()
      );
    }
  }, [accessToken, navigate, cmpId]);

  useEffect(() => {
    setCode(
      `<script src="/js/iframeResizer.min.js"></script>
<iframe style="width: 100%; position: absolute; height: 100%; border: none;" id="testimonialIframe"
        src="${backendURL}/wall-of-love?c=${cipherText}"></iframe>
<script> iFrameResize({ log: true }, "#testimonialIframe"); </script>`
    );
  }, [cipherText]);

  const successAlert = () => {
    messageApi.open({
      type: "success",
      content: "Copied to clipboard",
      className: "custom-class",
      style: {
        textAlign: "center",
        marginTop: "2vh",
        marginRight: "2vh",
      },
      duration: 2,
    });
    navigate("/dashboard");
  };

  const handleCopyClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
    const range = document.createRange();
    range.selectNode(event.currentTarget);

    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand("copy");
      selection.removeAllRanges();
    }
    successAlert();
  };

  return (
    <div className="h-full">
      {contextHolder}
      <NavigationBar />
      {cipherText && (
        <div className="mt-10 px-6 text-center">
          <span>
            Collect your user's love <br />
          </span>
          <p
            className="text-sky-600 cursor-pointer"
            onClick={handleCopyClick}
          >{`${backendURL}getdata?c=${cipherText}`}</p>
        </div>
      )}

      <div className="grid-rows-2">
        {customerDetails.data && customerDetails.data.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 content-start p-10">
            {customerDetails.data.map((customer: any) => {
              return (
                <TestimonialCard
                  key={customer.cust_id}
                  custName={customer.cust_name}
                  email={customer.email}
                  message={customer.testimonial}
                  cURL={customer.companyURL}
                />
              );
            })}
          </div>
        ) : (
          <h5 className="justify-self-center text-center m-10 h-60 text-white">
            No Testimonials To Show{" "}
          </h5>
        )}
        <div>
          {cipherText && (
            <div>
              <h4
                className="ml-8 mr-8 p-2"
                style={{
                  backgroundColor: "#272b2b",
                  color: "whitesmoke",
                }}
              >
                EMBED A WALL OF USER LOVE
              </h4>
              <CodeEditor
                value={code}
                language="js"
                readOnly
                padding={15}
                className="ml-8 mr-8"
                style={{
                  fontSize: 12,
                  backgroundColor: "#272b2b",
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
              />
              <h6>....</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
