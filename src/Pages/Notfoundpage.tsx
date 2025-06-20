import { Button } from "@/Components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const Notfoundpage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 p-6">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-4">
        <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="text-gray-500">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Button onClick={() => navigate("/")} className="mt-4">
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default Notfoundpage;
