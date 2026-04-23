"use client";

import { useState } from "react";
import TransferForm from "@/components/TransferForm";
import Navbar from "@/components/Navbar";

export default function TransferPage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Send Money</h1>
        <TransferForm />
      </div>
    </>
  );
}
