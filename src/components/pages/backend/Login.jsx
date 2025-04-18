// === React Frontend (Login.jsx) ===
// Example React login form with fetch call
import axios from "axios";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../../reduxStore/slices/authSlice";
import Input from "../../Common/Input";

export default function Login() {
  const base_UrlS = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${base_UrlS}/api/auth/login`,
        {
          username,
          password
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        dispatch(
          login({
            loginStatus: true,
            agencyId: "aid",
            userName: "response.data.responseData.displayName",
            token: "response.data.token"
          })
        );
        alert("Login successful");
        navigate("/backend/home");
      }
      //  else {
      //   alert("Login failed: " + text);
      // }
    } catch (err) {
      alert("Error: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="btn btn-primary" disabled={loading ? "disabled" : ""}>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          // <ThreeCircles
          //   visible={true}
          //   height="20"
          //   width="20"
          //   color="white"
          //   ariaLabel="Three-circles-loading"
          //   // wrapperStyle={{}}
          //   wrapperClass="justify-content-center"
          // />
          "Login"
        )}
      </button>
    </div>
  );
}
