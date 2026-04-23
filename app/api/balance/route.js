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

    const account = await prisma.account.findUnique({
      where: { userId: session.user.id },
    });

    if (!account) {
      return new Response(JSON.stringify({ error: "Account not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ balance: account.balance }), {
      status: 200,
    });
  } catch (error) {
    console.error("Balance fetch error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
