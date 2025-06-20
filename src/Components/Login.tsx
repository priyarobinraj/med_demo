import React, { useState } from "react";

interface LoginProps {
  onlogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onlogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      onlogin();
    } else {
      alert("Please enter both username and password.");
    }
  };

  const handleSignup = () => {
    alert("Redirecting to signup (or handle signup logic).");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to MediCare
          </h1>
          <p className="text-sm text-gray-500">Login to continue</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={handleSignup}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
