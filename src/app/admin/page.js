"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    localStorage.removeItem("auth");
    try {
      await axios.get("api/auth/logout", {
        withCredentials: true,
      });
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error("Error logging out");
    }
  };

  useEffect(() => {
    const loadDataFromLocalStorage = () => {
      const userDataString = localStorage.getItem("auth");

      if (userDataString) {
        const parsedUserData = JSON.parse(userDataString);
        const userObject = parsedUserData.state.user;
        setUser(userObject);
      }
      setIsLoading(false);
    };

    loadDataFromLocalStorage();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>ID: {user._id}</p>
          <p>Username: {user.username}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Verified Status: {user.isVerfied ? "yes" : "no"}</p>
          <p>Admin Status: {user.isAdmin ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
      <Button className="p-4 bg-red-500 rounded-lg" onClick={handleLogout}>
        Logout
      </Button>
      <Button>Reset Password</Button>
    </div>
  );
};

export default UserProfile;
