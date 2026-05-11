import clientPromise from "../../../lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    console.log("Sending OTP to:", email);
    console.log("Resend API Key exists:", !!process.env.RESEND_API_KEY);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const client = await clientPromise;
    const db = client.db("wire_transfer_bank");
    await db.collection("otps").updateOne(
      { email },
      { $set: { otp, expiresAt, createdAt: new Date() } },
      { upsert: true }
    );

    const result = await resend.emails.send({
      from: "SKKU Bank <onboarding@resend.dev>",
      to: email,
      subject: "Your verification code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
          <h2 style="color: #f97316;">SKKU Bank Verification</h2>
          <p>Your verification code is:</p>
          <h1 style="font-size: 48px; letter-spacing: 8px; color: #1d4ed8;">${otp}</h1>
          <p style="color: #6b7280;">This code expires in 10 minutes. Do not share it with anyone.</p>
        </div>
      `,
    });

    console.log("Resend result:", JSON.stringify(result));

    return Response.json({ success: true });
  } catch (error) {
    console.error("Send OTP error:", error.message);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
