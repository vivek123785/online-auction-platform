import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css"; // Ensure correct styling import

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    console.log("SignUp button clicked!");

    // 🔍 Debugging log to check values before submission
    console.log("Email:", email, "Password:", password, "Confirm:", confirmPassword);

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      console.log("Registration successful:", data);

      // Redirect to login page after successful registration
      navigate("/login");

    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignUp} className="signup-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* 🔍 Ensure the button is clickable */}
        <button type="submit" disabled={loading} onMouseEnter={() => console.log("Hovering over signup button!")}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default SignUp;
