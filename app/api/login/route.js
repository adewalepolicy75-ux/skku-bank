import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const client = await clientPromise;
    const db = client.db("wire_transfer_bank");
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 401 }
      );
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return Response.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      user: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        balance: user.balance,
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
