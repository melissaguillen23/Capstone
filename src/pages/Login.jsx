import React, { useState } from "react"
import { useAuth } from "../Context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { api } from "../API/CS_API";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError(null)
    
    try {
      const response = await api.loginUser(username, password);
      if (response && response.token) {
        login(response.token); 
        navigate("/")
      } else {
        setError("Invalid login credentials.")
      }
    } catch (error) {
      setError(error.message);
    }finally {
      setLoading(false)
    }
  };

    return (
      <div className="login">
        <h1>Welcome!</h1>
        <h3>Please sign in</h3>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <span>
            New Here? <Link to="/users">Create an Account</Link>
          </span>
        </form>
      </div>
    )
  }