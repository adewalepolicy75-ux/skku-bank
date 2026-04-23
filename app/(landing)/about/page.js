"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>About SKKU Bank</h1>
        <p>
          SKKU Bank is a digital banking platform designed specifically for the
          Sungkyunkwan University community. We provide fast, secure, and
          convenient money transfer services between SKKU members.
        </p>
      </div>
      <Footer />
    </>
  );
}
