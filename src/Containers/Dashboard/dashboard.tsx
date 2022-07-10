import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../base";
import { Input, Button } from "antd";
import "antd/dist/antd.css";

const Dashboard = () => {
  const [initial, setinitial] = useState("");
  const [myDatas, setmyDatas] = useState<any[]>([]);
  const [company, setcompany] = useState("");
  const [customerDetails, setcustomerDetails] = useState<{
    data: string[];
  }>(() => ({
    data: [],
  }));

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
      const payload = {
        CMP: cmpId || localStorage.getItem("CMP_id"),
      };

      Axios.post("/getAll", payload).then((response) => {
        setcustomerDetails({ data: [] });
        setcompany(response.data.data.company);
        setcustomerDetails({ data: response.data.data.Customers });
      });
    }
  }, []);

  const toLogout = () => {
    console.log("Logout");
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
      <a href="http://localhost:3000/getdata">http://localhost:3000/getdata</a>
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
