import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/auth.css"; 

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const toggleAuthView = () => setIsLogin(!isLogin); 

  return (
    <div className="auth-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {isLogin ? (
            <Login toggleAuthView={toggleAuthView} />
          ) : (
            <Register toggleAuthView={toggleAuthView} />
          )}
        </div>
      </div>
    </div>
  );
};

const Login = ({ toggleAuthView }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["flag"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post("https://podvibe-backend-e5rm.onrender.com/auth/login", {
        username,
        password,
      });
      alert(response.data.message);
      setCookies("flag", response.data.flag);
      window.localStorage.setItem("userID", response.data.userID);
      window.localStorage.setItem("flag", response.data.flag);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      navigate("/auth");
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-heading">Login</h2>
      <form className="auth-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
        <p className="auth-toggle-text">
          Don't have an account? <span onClick={toggleAuthView}>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

const Register = ({ toggleAuthView }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post("https://podvibe-backend-e5rm.onrender.com/auth/register", {
        username,
        password,
      });
      if (response.data) {
        alert("Registered successfully");
        navigate("/auth");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-heading">Register</h2>
      <form className="auth-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="reg-username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="reg-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
        <p className="auth-toggle-text">
          Already have an account? <span onClick={toggleAuthView}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Auth;