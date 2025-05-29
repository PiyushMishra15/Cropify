import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const baseURL = "http://localhost:3000/api"; // Change if needed
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Checking auth status...");
    axios
      .get(`${baseURL}/auth/verifyToken`, { withCredentials: true })
      .then((res) => {
        console.log("Auth success:", res.data);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log("Auth failed:", err.response?.status);
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Error verifying token:", err);
          navigate("/login");
        }
        setIsAuthenticated(false);
      });
  }, [navigate]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? children : null;
}
