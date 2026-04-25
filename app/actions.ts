"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(targetEmail: string, otpCode: string) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: targetEmail,
    subject: "Your Verification Code",
    html: `<p>Your code is: <strong>${otpCode}</strong></p>`,
  });
}
