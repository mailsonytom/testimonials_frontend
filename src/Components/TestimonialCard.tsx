import { Card, CardProps } from "antd";
import React from "react";
import styled from "styled-components";
import ProfileImage from "../Assets/profile.png";

const TestimonialCard = styled((props: any) => (
  <Card {...props}>
    <div className="grid grid-rows-3 font-sans text-start">
      <div className="grid grid-cols-6">
        <div className="justify-self-start mt-2 col-span-1">
          <img
            // onClick={showOptions}
            src={ProfileImage}
            alt="img"
            className="w-10 h-10 rounded-full	bg-white justify-self-end border-yellow-500	cursor-pointer"
          />
        </div>
        <div className="col-span-5">
          <span className="font-bold text-md text-left text-gray-200 tracking-normal">
            {props.custName}
          </span>
          <br />
          <span className="text-left text-sm text-gray-400 ease-in-out">
            {props.email}
          </span>
          <br />
          {props.cURL && (
            <span className="font-light">
              <a href={props.cURL}>{props.cURL}</a>
            </span>
          )}
        </div>
      </div>
      <div className="row-span-2 text-md text-gray-200 flex-grow mt-2 p-2 tracking-normal">
        <p>{props.message}</p>
      </div>
      <div className="row-span-1">
        {/* <hr style={{ borderColor: "#64e8ad" }} /> */}
        <span className="text-xs text-gray-300">Jul 18, 2022</span>
      </div>
    </div>
  </Card>
))`
  color: white;
  box-sizing: border-box;
  background: #25282c;
  height: 100%;
  border: 0 solid #c5d2dc;
  border-radius: 10px;
  .ant-card-body {
    min-height: 150px;
    padding: 16px;
    background: #25282c;
    border-radius: 10px;
  }
  .ant-card-body:hover {
    background: #35363d;
`;

export default TestimonialCard;
