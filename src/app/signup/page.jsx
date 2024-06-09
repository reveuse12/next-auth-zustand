"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (formData.username.length < 3 || formData.username.length > 20) {
      errors.username = "Username must be between 3 and 20 characters.";
    }
    if (formData.name.length < 3 || formData.name.length > 20) {
      errors.name = "Full Name must be between 3 and 20 characters.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (formData.password.length < 6 || formData.password.length > 100) {
      errors.password = "Password must be between 6 and 100 characters.";
    }
    return errors;
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("api/auth/signup", formData);
      toast.success("Register Successful");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Register Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 rounded-lg shadow-lg bg-white">
        <CardHeader className="px-6 py-4 border-b border-gray-200">
          <CardTitle className="text-center text-4xl font-bold text-gray-900">
            Register
          </CardTitle>
          <CardDescription className="mt-2 text-center text-sm text-gray-600">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6 px-6 " onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                id="username"
                name="username"
                type="text"
                required
                minLength={3}
                maxLength={20}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Username"
                onChange={handleChange}
                value={formData.username}
              />
              {errors.username && (
                <p className="text-red-500 text-xs">{errors.username}</p>
              )}
              <Input
                id="name"
                name="name"
                type="text"
                required
                minLength={3}
                maxLength={20}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Full Name"
                onChange={handleChange}
                value={formData.name}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
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
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                maxLength={100}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center justify-center">
              <Button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 rounded-md shadow-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="justify-center px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
