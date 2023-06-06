import { Box, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";

function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserToken();
  }, []);

  const checkUserToken = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/verifytoken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setRedirect(true);
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  if (redirect) {
    return navigate("/auth/login");
  }

  return children;
}

export default AuthGuard;
