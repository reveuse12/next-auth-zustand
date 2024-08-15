"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthStore } from "@/store/store";
import React from "react";

const page = () => {
  const user = AuthStore((state) => state.user);
  console.log(user);
  return (
    <div className="flex-1 space-y-4   md:p-2">
      <h1 className="text-2xl font-bold text-center">Welcome, {user?.name}</h1>
      <form className="max-w-xl">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user?.email} disabled />
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={user?.name} disabled />
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={user?.username} disabled />
          {user?.isAdmin && (
            <>
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={user.isAdmin ? "Admin" : "no"} disabled />
            </>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default page;
