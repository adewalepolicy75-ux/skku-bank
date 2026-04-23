import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { generateOTP } from "@/lib/utils";

export async function POST(request) {
  try {
    const { name, email, phone, password } = await request.json();

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        otp,
        otpExpiry,
      },
    });

    // Create account
    await prisma.account.create({
      data: {
        userId: user.id,
        balance: 0,
      },
    });

    // TODO: Send OTP via SMS/Email

    return new Response(
      JSON.stringify({ message: "User created. OTP sent." }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
