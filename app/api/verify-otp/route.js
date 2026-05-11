import clientPromise from "../../../lib/mongodb";

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    const client = await clientPromise;
    const db = client.db("wire_transfer_bank");
    const otpRecord = await db.collection("otps").findOne({ email });

    if (!otpRecord) {
      return Response.json(
        { success: false, error: "OTP not found. Please request a new code." },
        { status: 400 }
      );
    }

    if (new Date() > new Date(otpRecord.expiresAt)) {
      return Response.json(
        { success: false, error: "OTP has expired. Please request a new code." },
        { status: 400 }
      );
    }

    if (otpRecord.otp !== otp) {
      return Response.json(
        { success: false, error: "Invalid code. Please try again." },
        { status: 400 }
      );
    }

    // Delete OTP after successful verification
    await db.collection("otps").deleteOne({ email });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
