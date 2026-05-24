import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const DAILY_LIMITS: Record<string, number> = { free: 15, pro: 999999, agency: 999999 };

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const now = new Date();
    const lastReset = new Date(user.lastResetDate);
    const isNewDay = now.toDateString() !== lastReset.toDateString();
    const usage = isNewDay ? 0 : user.dailyUsage;
    const limit = DAILY_LIMITS[user.plan] || 15;
    return NextResponse.json({ usage, limit, plan: user.plan, remaining: Math.max(0, limit - usage) });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
