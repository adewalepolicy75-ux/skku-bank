import { useState } from "react";
import { Smartphone, Mail, CheckCircle, ScanFace } from "lucide-react";
import FaceVerify from "./FaceVerify";

export default function TwoFactorVerify({ onVerified, onBack, email, phone }) {
  const [method, setMethod] = useState(null);
  const [code, setCode] = useState("");
  const [step, setStep] = useState("choose");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendCode = async (selectedMethod) => {
    setLoading(true);
    setError("");
    setMethod(selectedMethod);

    const response = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.success) {
      setStep("verify");
    } else {
      setError(data.error || "Failed to send code. Try again.");
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    setError("");

    const response = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: code }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.success) {
      setStep("success");
      setTimeout(() => onVerified(true), 1500);
    } else {
      setError(data.error || "Invalid code. Please try again.");
    }
  };

  if (step === "success") {
    return (
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verified!</h2>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    );
  }

  if (step === "face") {
    return (
      <FaceVerify
        mode="login"
        onVerified={(verified) => {
          if (verified) {
            setStep("success");
            setTimeout(() => onVerified(true), 1500);
          }
        }}
        onBack={() => setStep("choose")}
      />
    );
  }

  if (step === "verify") {
    return (
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Enter Verification Code</h2>
          <p className="text-gray-500 text-sm mt-2">
            Code sent to {method === "sms" ? phone : email}
          </p>
        </div>
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
        <input
          type="text"
          maxLength="6"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full text-center text-2xl tracking-wider py-3 border border-gray-300 rounded-xl mb-4"
          placeholder="000000"
          autoFocus
        />
        <button
          onClick={verifyCode}
          disabled={loading || code.length !== 6}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
        <button
          onClick={() => sendCode(method)}
          disabled={loading}
          className="w-full mt-3 text-orange-500 text-sm hover:underline disabled:opacity-50"
        >
          Resend Code
        </button>
        <button
          onClick={() => setStep("choose")}
          className="w-full mt-2 text-gray-500 text-sm hover:underline"
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Two-Factor Verification</h2>
        <p className="text-gray-500 text-sm">
          Choose how to verify your identity
        </p>
      </div>
      {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
      <button
        onClick={() => sendCode("sms")}
        disabled={loading}
        className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl mb-3 hover:border-orange-500 hover:bg-orange-50 transition disabled:opacity-50"
      >
        <Smartphone className="w-6 h-6 text-orange-500" />
        <div className="flex-1 text-left">
          <p className="font-semibold">Text Message (SMS)</p>
          <p className="text-sm text-gray-500">Send code to {phone}</p>
        </div>
      </button>
      <button
        onClick={() => sendCode("email")}
        disabled={loading}
        className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl mb-3 hover:border-orange-500 hover:bg-orange-50 transition disabled:opacity-50"
      >
        <Mail className="w-6 h-6 text-orange-500" />
        <div className="flex-1 text-left">
          <p className="font-semibold">Email</p>
          <p className="text-sm text-gray-500">Send code to {email}</p>
        </div>
      </button>
      <button
        onClick={() => setStep("face")}
        disabled={loading}
        className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition disabled:opacity-50"
      >
        <ScanFace className="w-6 h-6 text-orange-500" />
        <div className="flex-1 text-left">
          <p className="font-semibold">Face Verification</p>
          <p className="text-sm text-gray-500">Scan your face to verify</p>
        </div>
      </button>
      <button
        onClick={onBack}
        className="w-full mt-4 text-gray-500 text-sm hover:text-gray-700 transition"
      >
        ← Back to login
      </button>
    </div>
  );
}
