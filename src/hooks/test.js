import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);