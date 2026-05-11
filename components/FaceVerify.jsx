"use client";

import { useEffect, useRef, useState } from "react";

export default function FaceVerify({ onVerified, onBack, mode = "login" }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Loading face detection...");

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    const loadModels = async () => {
      const faceapi = await import("face-api.js");
      const MODEL_URL = "/models";

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);

      setMessage("Starting camera...");

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().then(() => {
            setStatus("ready");
            setMessage(
              mode === "register"
                ? "Position your face and click Register"
                : "Position your face and click Verify"
            );
          }).catch((err) => {
            console.warn("Play error:", err.message);
          });
        };
      }
    };

    loadModels().catch((err) => {
      setMessage("Error: " + err.message);
      setStatus("error");
    });

    return () => stopCamera();
  }, []);

  const capture = async () => {
    const faceapi = await import("face-api.js");
    setStatus("processing");
    setMessage("Scanning face...");

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      setMessage("No face detected. Make sure your face is visible.");
      setStatus("ready");
      return;
    }

    const descriptor = Array.from(detection.descriptor);

    if (mode === "register") {
      localStorage.setItem("faceDescriptor", JSON.stringify(descriptor));
      stopCamera();
      setMessage("Face registered successfully!");
      setStatus("success");
      setTimeout(() => onVerified(true), 1500);
    } else {
      const saved = localStorage.getItem("faceDescriptor");
      if (!saved) {
        setMessage("No face registered. Please register first.");
        setStatus("error");
        return;
      }

      const savedDescriptor = new Float32Array(JSON.parse(saved));
      // Increased threshold from 0.5 to 0.65 for better recognition
      const distance = faceapi.euclideanDistance(descriptor, Array.from(savedDescriptor));
      console.log("Face distance:", distance);

      if (distance < 0.65) {
        stopCamera();
        setMessage("Face verified!");
        setStatus("success");
        setTimeout(() => onVerified(true), 1500);
      } else {
        setMessage(`Face not recognized (score: ${distance.toFixed(2)}). Try better lighting.`);
        setStatus("ready");
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {mode === "register" ? "Register Your Face" : "Face Verification"}
      </h2>
      <p className="text-gray-500 text-sm mb-4 text-center">{message}</p>

      <div
        className="relative overflow-hidden border-4 border-orange-500 mb-4"
        style={{ borderRadius: "50%", width: "280px", height: "340px" }}
      >
        <video
          ref={videoRef}
          muted
          className="block"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>

      {(status === "ready" || status === "processing") && (
        <button
          onClick={capture}
          disabled={status === "processing"}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
        >
          {status === "processing"
            ? "Scanning..."
            : mode === "register"
            ? "Register Face"
            : "Verify Face"}
        </button>
      )}

      {status === "success" && (
        <div className="text-green-600 font-semibold text-lg">
          {mode === "register" ? "✅ Registered!" : "✅ Verified!"}
        </div>
      )}

      {status !== "success" && (
        <button
          onClick={() => { stopCamera(); onBack(); }}
          className="mt-3 text-gray-500 text-sm hover:underline"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
