import React, { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../base";
import "antd/dist/antd.css";
import CodeEditor from "@uiw/react-textarea-code-editor";
import NavigationBar from "../Navigation";
import TestimonialCard from "../../Components/TestimonialCard";

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

  const [cipherText, setcipherText] = useState("");
  const [code, setCode] = React.useState("");

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
        src="${backendURL}/wall-of-love?cmp=${cipherText}"></iframe>
<script> iFrameResize({ log: true }, "#testimonialIframe"); </script>`
    );
  }, [cipherText]);

  return (
    <div className="h-100%">
      <NavigationBar />
      {cipherText && (
        <div className="mt-10 px-6">
          <span>
            Create your love <br />
          </span>
          <a href={`${backendURL}getdata?cmp=${cipherText}`}>
            {`${backendURL}getdata?cmp=${cipherText}`}
          </a>
        </div>
      )}

      <div className="grid-rows-2 h-screen">
        {customerDetails.data && customerDetails.data.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 content-start p-10">
            {customerDetails.data.map((customer: any) => {
              // console.log(customer);
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
          <h5 className="justify-self-center m-10 h-60 text-white">No Testimonials To Show </h5>
        )}
        <div>
          {cipherText && (
            <div>
              <h4
                className="ml-8 mr-8 py-2"
                style={{
                  backgroundColor: "#272b2b",
                  color: "whitesmoke",
                }}
              >
                ADD THIS SCRIPT TO YOUR PAGE
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
