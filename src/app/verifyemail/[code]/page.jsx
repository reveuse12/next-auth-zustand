"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page = ({ params }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerification = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/auth/verifyemail`, {
        code: params.code,
      });
      if (response.status === 200) {
        setStatus("success");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white text-center p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Email Verification
        </h1>
        <p className="text-gray-700 mb-6">
          Click the button below to verify your email address.
        </p>
        <Button
          onClick={handleVerification}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </Button>
        {status === "success" && (
          <p className="mt-6 text-green-600 font-semibold">
            Email verified successfully! Redirecting...
          </p>
        )}
        {status === "error" && (
          <p className="mt-6 text-red-600 font-semibold">
            Verification failed. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
