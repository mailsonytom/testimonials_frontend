import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [initial, setinitial] = useState("");
  const [myDatas, setmyDatas] = useState<any[]>([]);

  const {
    state: { accessToken },
    dispatch,
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
  }, []);

  useEffect(() => {
    return () => {
      // userAction();
    };
  }, [initial]);

  // const userAction = async () => {
  //   const response = await fetch("http://localhost:8080/testimonials");
  //   const myJson = await response.json();
  //   console.log(myJson);
  //   myDatas.push(...myDatas, myJson);
  // };

  return (
    <div>
      <h1>All Testimonials</h1>
      <a href="http://localhost:3000/getdata">http://localhost:3000/getdata</a>
      <div className="h-56 grid grid-cols-4 gap-3 content-start p-10">
        {myDatas &&
          myDatas.map((myData) => {
            return (
              <Card
                key={myData._id}
                className="bg-gray-400 content-start"
                style={{ width: 300 }}
              >
                <p>Name: {myData.user_name}</p>
                <p>Email: {myData.user_email}</p>
                <p className="truncate">Message: {myData.text}</p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
