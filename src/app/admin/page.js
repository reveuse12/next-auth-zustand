"use client";
import { AuthStore } from "@/store/store";
import React from "react";

const Page = () => {
  // const user = AuthStore((state) => state.user)
  const token = AuthStore((state) => state.token);
  return (
    <div>
      <h1>Hello Admin!!</h1>
      <h2>Token: {token}</h2>
    </div>
  );
};

export default Page;
