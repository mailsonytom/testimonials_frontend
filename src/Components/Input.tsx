import React from "react";
import { Input, InputProps } from "antd";
import { TextAreaProps } from "antd/lib/input";
import styled from "styled-components";

export const DataInput = styled((props: InputProps) => <Input {...props} />)`
  background: #f7fafa;
  border: none;
  margin: 3px;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 13px;
  &::placeholder {
    color: #b9b9b9;
    font-weight: large;
  }
`;

export const DataTextArea = styled((props: TextAreaProps) => (
  <Input.TextArea {...props} />
))`
  background: #f7fafa;
  border: none;
  margin: 3px;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 13px;
  &::placeholder {
    color: #b9b9b9;
    font-weight: large;
  }
`;
