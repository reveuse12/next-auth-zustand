"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthStore } from "@/store/store";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

function Page() {
  const navigate = useRouter();
  const setToken = AuthStore((state) => state.setToken);
  const setUser = AuthStore((state) => state.setUser);
  const setRefreshToken = AuthStore((state) => state.setRefreshToken);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("api/auth/login", formData);
      setToken(res.data.token);
      setUser(res.data.user);
      setRefreshToken(res.data.refreshToken);
      toast.success("Login Successful");

      if (res.data.user.isAdmin === true) {
        navigate.push("/admin");
      } else {
        navigate.push("/dashboard");
      }
    } catch (error) {
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 rounded-lg shadow-lg bg-white">
        <CardHeader className="px-6 py-4 border-b border-gray-200">
          <CardTitle className="text-center text-4xl font-bold text-gray-900">
            Login
          </CardTitle>
          <CardDescription className="mt-2 text-center text-sm text-gray-600">
            Welcome Back!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6 px-6 pb-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email Address"
                onChange={handleChange}
                value={formData.email}
              />
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
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember_me"
                  name="remember_me"
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember_me" className="text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 rounded-md shadow-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
