import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { fromPhone, toPhone, amount } = await request.json();

    const client = await clientPromise;
    const db = client.db("skku_bank");
    const users = db.collection("users");

    // Find sender by phone
    const sender = await users.findOne({ phone: fromPhone });
    if (!sender) {
      return Response.json(
        { success: false, error: "Sender not found" },
        { status: 404 },
      );
    }

    // Check if sender has enough balance
    if (sender.balance < amount) {
      return Response.json(
        { success: false, error: "Insufficient balance" },
        { status: 400 },
      );
    }

    // Find receiver by phone
    const receiver = await users.findOne({ phone: toPhone });
    if (!receiver) {
      return Response.json(
        {
          success: false,
          error: "Receiver not found. Phone number not registered",
        },
        { status: 404 },
      );
    }

    // Perform transfer
    await users.updateOne({ phone: fromPhone }, { $inc: { balance: -amount } });

    await users.updateOne({ phone: toPhone }, { $inc: { balance: amount } });

    // Get updated balance
    const updatedSender = await users.findOne({ phone: fromPhone });

    return Response.json({
      success: true,
      message: `Successfully sent ₦${amount} to ${receiver.fullName} (${receiver.phone})`,
      newBalance: updatedSender.balance,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
