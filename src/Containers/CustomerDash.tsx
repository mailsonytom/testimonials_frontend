import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Axios } from "../base";
import { useLocation } from "react-router-dom";

var CryptoJS = require("crypto-js");
const secretKey = process.env.REACT_APP_MY_SECRET_KEY;

const CustomerDash = () => {
  const [mount, setmount] = useState("initial");
  const [company, setcompany] = useState("");
  const [comp_id, setcomp_id] = useState("");
  const [customerDetails, setcustomerDetails] = useState<{
    data: string[];
  }>(() => ({
    data: [],
  }));

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get("cmp");
    const NewId = id && id.replaceAll(" ", "+");
    var bytesData =
      NewId &&
      CryptoJS.AES.decrypt(NewId, secretKey).toString(CryptoJS.enc.Utf8);
    var decryptedData = JSON.parse(bytesData);
    decryptedData && setcomp_id(decryptedData);
    const payload = {
      CMP: comp_id || decryptedData,
    };
    payload.CMP &&
      Axios.post("/getAll", payload).then((response) => {
        setcustomerDetails({ data: [] });
        setcompany(response.data.data.company);
        setcustomerDetails({ data: response.data.data.Customers });
      });
  }, []);

  return (
    <div>
      <div>
        <p className="font-serif text-xl subpixel-antialiased	font-extrabold tracking-wide mt-5">
          Testimonials
        </p>
      </div>
      <div className="h-max	grid grid-cols-4 gap-3 content-start p-6">
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

export default CustomerDash;
