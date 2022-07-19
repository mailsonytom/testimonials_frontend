import { Card, CardProps } from "antd";
import React from "react";
import styled from "styled-components";
import ProfileImage from "../Assets/profile.png";

const TestimonialCard = styled((props: any) => (
  <Card {...props}>
    <div className="grid grid-rows-3">
      <div className="row-span-2">
        <p>{props.message}</p>
      </div>
      <div className="row-span-1">
        <span className="text-xs" style={{ color: "#86b0a0" }}>
          18 Jul 2022
        </span>
        <hr style={{ borderColor: "#64e8ad" }} />
        <div className="grid grid-cols-2">
          <div className="justify-self-start">
            <span className="font-bold">{props.custName}</span>
            <br />
            <span className="font-light">{props.email}</span>
          </div>
          <div className="justify-self-end mr-1 mt-2">
            <img
              // onClick={showOptions}
              src={ProfileImage}
              alt="img"
              className="w-10 h-10 rounded-full	bg-white justify-self-end border-yellow-500	cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </Card>
))`
  color: white;
  background: #ffffff;
  height: 100%;
  border-radius: 10px;
  border: 2px solid #4fdb9c;
  box-shadow: 5px 5px 3px #f0f5f5;
  .ant-card-body {
    min-height: 150px;
    padding: 16px;
    background: #3a403e;
    border-radius: 10px;
  }
`;

export default TestimonialCard;
