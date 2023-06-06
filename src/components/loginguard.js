import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);

    setLoading(false);
    setRedirect(true);
  }, [children]);

  if (loading) {
    return "Loading ...";
  }

  if (redirect) {
    navigate("/");
    return;
  }

  return children;
}

export default LoginGuard;
