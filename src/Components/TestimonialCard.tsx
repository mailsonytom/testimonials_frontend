import { Card, CardProps } from "antd";
import React from "react";
import styled from "styled-components";

const TestimonialCard = styled((props: any) => (
  <Card {...props}>
    <div>
      <p className="truncate">{props.message}</p>
    </div>
    <div className="justify-self-end">
      <hr style={{ borderColor: "#6aa18e" }} />
      <span>{props.custName}</span>
      <br />
      <span>{props.email}</span>
    </div>
  </Card>
))`
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 3px #f0f5f5;
  .ant-card-body {
    min-height: 150px;
    padding: 16px;
    background: #9bccbd;
    border-radius: 10px;
  }
`;

export default TestimonialCard;
