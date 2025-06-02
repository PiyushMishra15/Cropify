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
        setIsAuthenticated(true);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          navigate("/login");
        }
        setIsAuthenticated(false);
      });
  }, [navigate]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? children : null;
}
