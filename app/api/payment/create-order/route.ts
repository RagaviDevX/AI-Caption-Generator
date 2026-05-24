import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";

const PLANS: Record<string, { amount: number; name: string }> = {
  pro: { amount: 199000, name: "Pro Plan" },
  agency: { amount: 799000, name: "Agency Plan" },
};

export async function POST(req: NextRequest) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { plan } = await req.json();
    const planConfig = PLANS[plan];
    if (!planConfig) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    const order = await razorpay.orders.create({
      amount: planConfig.amount, currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { userId: session.user.id, plan },
    });

    await prisma.payment.create({
      data: { userId: session.user.id, razorpayOrderId: order.id, amount: planConfig.amount, plan, status: "pending" },
    });

    return NextResponse.json({
      orderId: order.id, amount: planConfig.amount, currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID, name: "CaptionAI", description: planConfig.name,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
