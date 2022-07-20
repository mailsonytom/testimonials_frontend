import React, { useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("CMP_id");
    window.location.reload();
    navigate("/login");
  }, []);

  // useEffect(() => {}, [navigate]);

  return <span>Loggin Out</span>;
};

export default Logout;
