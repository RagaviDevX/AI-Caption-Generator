import { NextRequest, NextResponse } from "next/server";
import { generateCaptions } from "@/lib/groq";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const DAILY_LIMITS: Record<string, number> = { free: 15, pro: 999999, agency: 999999 };

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ success: false, error: "Please sign in to generate captions." }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });

    // Reset daily usage if it's a new day
    const now = new Date();
    const lastReset = new Date(user.lastResetDate);
    const isNewDay = now.toDateString() !== lastReset.toDateString();
    if (isNewDay) {
      await prisma.user.update({ where: { id: user.id }, data: { dailyUsage: 0, lastResetDate: now } });
      user.dailyUsage = 0;
    }

    const limit = DAILY_LIMITS[user.plan] || 15;
    if (user.dailyUsage >= limit) {
      return NextResponse.json({
        success: false,
        error: `Daily limit reached (${limit}/day). ${user.plan === "free" ? "Upgrade to Pro for unlimited generations." : ""}`,
        limitReached: true,
        usage: user.dailyUsage,
        limit,
      }, { status: 429 });
    }

    const { imageUrl, tone = "viral" } = await req.json();
    if (!imageUrl) return NextResponse.json({ success: false, error: "Image URL is required" }, { status: 400 });
    if (!process.env.GROQ_API_KEY) return NextResponse.json({ success: false, error: "AI service not configured." }, { status: 500 });

    const captions = await generateCaptions(imageUrl, tone);

    await prisma.user.update({ where: { id: user.id }, data: { dailyUsage: { increment: 1 } } });
    await prisma.generation.create({
      data: { userId: user.id, imageUrl, ...captions, tone },
    });

    return NextResponse.json({
      success: true,
      data: captions,
      usage: user.dailyUsage + 1,
      limit,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
