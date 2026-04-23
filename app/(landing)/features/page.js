"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Features</h1>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Fast Transfers</h3>
            <p>Send money to other SKKU users instantly</p>
          </div>
          <div className="feature-card">
            <h3>Secure</h3>
            <p>End-to-end encryption and OTP verification</p>
          </div>
          <div className="feature-card">
            <h3>Track Transactions</h3>
            <p>View your complete transaction history</p>
          </div>
          <div className="feature-card">
            <h3>Easy Signup</h3>
            <p>Register with your phone number or email</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
