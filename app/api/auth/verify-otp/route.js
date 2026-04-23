import { prisma } from "@/lib/db";

export async function POST(request) {
  try {
    const { otp } = await request.json();

    // Find user with matching OTP
    const user = await prisma.user.findFirst({
      where: { otp },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), {
        status: 400,
      });
    }

    // Check if OTP expired
    if (user.otpExpiry < new Date()) {
      return new Response(JSON.stringify({ error: "OTP expired" }), {
        status: 400,
      });
    }

    // Update user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verified: true,
        otp: null,
        otpExpiry: null,
      },
    });

    return new Response(
      JSON.stringify({ message: "Email verified successfully" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("OTP verification error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
