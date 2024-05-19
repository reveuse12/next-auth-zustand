"use client";
import React, { useState } from "react";
import axios from "axios";
import { AuthStore } from "@/store/store";
import { useRouter } from "next/navigation";

function Page() {
  const navigate = useRouter();
  const setToken = AuthStore((state) => state.setToken);
  const setUser = AuthStore((state) => state.setUser);
  const setRefreshToken = AuthStore((state) => state.setRefreshToken);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Submitted:", formData);
    try {
      const res = await axios.post("api/auth/login", formData);
      setToken(res.data.token);
      setUser(res.data.user);
      setRefreshToken(res.data.refreshToken);
      navigate.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-full h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 rounded-lg shadow-md bg-white">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome Back!
          </p>
        </div>
        <form className="space-y-6 px-5 pb-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email Address"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label for="remember_me" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
