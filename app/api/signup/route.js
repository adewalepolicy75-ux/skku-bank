import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { fullName, email, phone, password } = await request.json();

    const client = await clientPromise;
    const db = client.db("skku_bank");
    const users = db.collection("users");

    // Check if user already exists
    const existingUser = await users.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return Response.json(
        { success: false, error: "User already exists" },
        { status: 400 },
      );
    }

    // Create new user in MongoDB
    const newUser = {
      fullName,
      email,
      phone,
      password,
      balance: 0,
      createdAt: new Date(),
      accountNumber: phone,
    };

    const result = await users.insertOne(newUser);

    return Response.json({
      success: true,
      message: "User created successfully",
      user: { fullName, email, phone, accountNumber: phone },
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
