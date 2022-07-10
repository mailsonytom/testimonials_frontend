import React, { useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("CMP_id");
    navigate("/login");
  }, []);

  return <span>Loggin Out</span>;
};

export default Logout;
