import React from "react";
import ProfileImage from "../Assets/profile.png";
import { Dropdown, Menu, MenuProps } from "antd";
import DropOption from "../Components/DropOption";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    if (e.key === "0") {
      navigate("/logout");
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: <h4>Account Settings</h4>,
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: <h4>Logout</h4>,
          key: "0",
        },
      ]}
    />
  );

  return (
    <div className="grid grid-cols-2 text-slate-200 p-3">
      <span className="font-serif text-xl subpixel-antialiased	font-extrabold tracking-wide justify-self-start mt-1 ml-10">
        Testimonials
      </span>
      <div className="justify-self-end mr-10">
        <DropOption overlay={menu} trigger={["click"]}>
          <img
            src={ProfileImage}
            alt="img"
            className="w-10 h-10 rounded-full	bg-white justify-self-end border-yellow-500	cursor-pointer"
          />
        </DropOption>
      </div>
    </div>
  );
};

export default NavigationBar;
