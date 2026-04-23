import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { recipientIdentifier, amount } = await request.json();

    if (!recipientIdentifier || !amount) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    if (amount <= 0) {
      return new Response(
        JSON.stringify({ error: "Amount must be greater than 0" }),
        { status: 400 },
      );
    }

    // Find recipient
    const recipient = await prisma.user.findFirst({
      where: {
        OR: [{ phone: recipientIdentifier }, { email: recipientIdentifier }],
      },
    });

    if (!recipient) {
      return new Response(JSON.stringify({ error: "Recipient not found" }), {
        status: 404,
      });
    }

    // Get sender's account
    const senderAccount = await prisma.account.findUnique({
      where: { userId: session.user.id },
    });

    if (!senderAccount) {
      return new Response(
        JSON.stringify({ error: "Sender account not found" }),
        { status: 404 },
      );
    }

    if (senderAccount.balance < amount) {
      return new Response(JSON.stringify({ error: "Insufficient balance" }), {
        status: 400,
      });
    }

    // Get recipient's account
    const recipientAccount = await prisma.account.findUnique({
      where: { userId: recipient.id },
    });

    if (!recipientAccount) {
      return new Response(
        JSON.stringify({ error: "Recipient account not found" }),
        { status: 404 },
      );
    }

    // Create transaction using transaction (atomic operation)
    const transaction = await prisma.$transaction(async (tx) => {
      // Deduct from sender
      await tx.account.update({
        where: { id: senderAccount.id },
        data: { balance: { decrement: amount } },
      });

      // Add to recipient
      await tx.account.update({
        where: { id: recipientAccount.id },
        data: { balance: { increment: amount } },
      });

      // Record transaction
      return tx.transaction.create({
        data: {
          senderId: session.user.id,
          receiverId: recipient.id,
          amount,
          status: "completed",
        },
      });
    });

    return new Response(JSON.stringify(transaction), { status: 201 });
  } catch (error) {
    console.error("Transfer error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
