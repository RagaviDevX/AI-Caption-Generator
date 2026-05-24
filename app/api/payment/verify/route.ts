import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSig = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(body).digest("hex");
    if (expectedSig !== razorpay_signature) return NextResponse.json({ error: "Invalid signature" }, { status: 400 });

    await prisma.payment.update({ where: { razorpayOrderId: razorpay_order_id }, data: { razorpayPaymentId: razorpay_payment_id, status: "success" } });
    await prisma.user.update({ where: { id: session.user.id }, data: { plan: plan || "free" } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
