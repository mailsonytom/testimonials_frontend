import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../base";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import CodeEditor from "@uiw/react-textarea-code-editor";
import NavigationBar from "../Navigation";
import TestimonialCard from "../../Components/TestimonialCard";

var CryptoJS = require("crypto-js");
const secretKey = process.env.REACT_APP_MY_SECRET_KEY;

const Dashboard = () => {
  const [initial, setinitial] = useState("");
  const [myDatas, setmyDatas] = useState<any[]>([]);
  const [company, setcompany] = useState("");
  const [customerDetails, setcustomerDetails] = useState<{
    data: string[];
  }>(() => ({
    data: [],
  }));

  const [cipherText, setcipherText] = useState("");
  const [code, setCode] = React.useState("");

  const {
    state: { accessToken, cmpId },
    dispatch,
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
  }, []);

  useEffect(() => {
    setCode(
      `<script src="/js/iframeResizer.min.js"></script>
<iframe style="width: 100%; position: absolute; height: 100%; border: none;" id="testimonialIframe"
        src="http://localhost:3000/wall-of-love?cmp=${cipherText}"></iframe>
<script> iFrameResize({ log: true }, "#testimonialIframe"); </script>`
    );
  }, [cipherText]);

  const toLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="h-100%">
      <NavigationBar />
      <div>
        <p className="font-serif text-xl subpixel-antialiased	font-extrabold tracking-wide mt-5">
          Testimonials
        </p>
        <p className="text-black text-sm text-end mr-5 -mt-10">
          <Button type="primary" size="small" onClick={toLogout}>
            LOGOUT
          </Button>
        </p>
      </div>
      {cipherText && (
        <div>
          <span>Add New Testimonial Link: </span>
          <a href={`http://localhost:3000/getdata?cmp=${cipherText}`}>
            {`http://localhost:3000/getdata?cmp=${cipherText}`}
          </a>
        </div>
      )}

      <div className="grid-rows-2">
        <div className="h-100 grid grid-cols-4 gap-3 content-start p-10">
          {customerDetails.data.length > 0 &&
            customerDetails.data.map((customer: any) => {
              console.log(customer);
              return (
                <TestimonialCard
                  key={customer.cust_id}
                  className="font-medium tracking-tight text-start"
                  custName={customer.cust_name}
                  email={customer.email}
                  message={customer.testimonial}
                />
              );
            })}
        </div>
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
