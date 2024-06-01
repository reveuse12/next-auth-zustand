"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const [status, setStatus] = useState(null);
  const router = useRouter();

  const handleVerification = async () => {
    try {
      const response = await axios.post(`/api/auth/verifyemail`, {
        code: params.code,
      });
      if (response.status === 200) {
        setStatus("success");
        router.push("/login");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className="mb-4">
          Click the button below to verify your email address.
        </p>
        <button
          onClick={handleVerification}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Verify Email
        </button>
        {status === "success" && (
          <p className="mt-4 text-green-500">
            Email verified successfully! Redirecting...
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-500">
            Verification failed. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
