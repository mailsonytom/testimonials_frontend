import { Dropdown, Menu, DropDownProps } from "antd";
import React from "react";
import styled from "styled-components";

const DropOption = styled(Dropdown)<DropDownProps>`
  .ant-dropdown-menu  {
    border-radius: 10px;
  }
`;

export default DropOption;
