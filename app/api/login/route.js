import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const client = await clientPromise;
    const db = client.db("skku_bank");
    const users = db.collection("users");

    // Find user by email
    const user = await users.findOne({ email });

    if (!user) {
      return Response.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 401 },
      );
    }

    // Check password (simple for now)
    if (user.password !== password) {
      return Response.json(
        {
          success: false,
          error: "Invalid password",
        },
        { status: 401 },
      );
    }

    return Response.json({
      success: true,
      message: "Login successful",
      user: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        accountNumber: user.accountNumber,
        balance: user.balance,
      },
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
