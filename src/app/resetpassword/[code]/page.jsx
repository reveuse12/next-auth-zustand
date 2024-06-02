"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const Page = ({ params }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (formData.password !== formData.confirmPassword) {
        return toast.error("Passwords do not match!");
      }

      const res = await axios.post("/api/auth/resetpassword", {
        password: formData.password,
        code: params.code,
      });
      toast.success("Password reset successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 rounded-lg shadow-lg bg-white">
        <CardHeader className="px-6 py-4 border-b border-gray-200">
          <CardTitle className="text-center text-2xl font-semibold text-gray-900">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6 px-6 pb-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
            <div className="flex items-center">
              <Button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 rounded-md shadow-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
              >
                {loading ? "Loading..." : "Reset Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
