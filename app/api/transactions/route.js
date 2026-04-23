import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ senderId: session.user.id }, { receiverId: session.user.id }],
      },
      include: {
        sender: { select: { name: true, email: true } },
        receiver: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(transactions), { status: 200 });
  } catch (error) {
    console.error("Transactions fetch error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
