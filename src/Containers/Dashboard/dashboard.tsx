import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../base";
import { Input, Button } from "antd";
import "antd/dist/antd.css";

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

  const toLogout = () => {
    navigate("/logout");
  };

  return (
    <div>
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
      <div>
        <h4>SCRIPT:</h4>
      </div>
      <div className="h-56 grid grid-cols-4 gap-3 content-start p-10">
        {customerDetails.data.length > 0 &&
          customerDetails.data.map((customer: any) => {
            return (
              <Card
                key={customer.cust_id}
                className="font-medium tracking-tight text-start"
                style={{ width: 300, backgroundColor: "#9bccbd" }}
              >
                <p>Name: {customer.cust_name}</p>
                <p>Email: {customer.email}</p>
                <p className="truncate">Message: {customer.testimonial}</p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
