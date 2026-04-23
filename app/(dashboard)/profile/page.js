"use client";

import { useSession, signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Profile</h1>
        {session && (
          <div className="profile-card">
            <p>
              <strong>Name:</strong> {session.user.name}
            </p>
            <p>
              <strong>Email:</strong> {session.user.email}
            </p>
            <p>
              <strong>Phone:</strong> {session.user.phone}
            </p>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
