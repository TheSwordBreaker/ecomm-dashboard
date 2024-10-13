"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { Model } from "~/components/ui/modal";

const SetupPage = () => {
  return (
    <div className="p-4">
      Setup Page
      <UserButton />
    </div>
  );
};

export default SetupPage;
