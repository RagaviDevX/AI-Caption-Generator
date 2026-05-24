import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { generations: { orderBy: { createdAt: "desc" }, take: 10 }, payments: { orderBy: { createdAt: "desc" }, take: 5 } },
    });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { name } = await req.json();
    const user = await prisma.user.update({ where: { id: session.user.id }, data: { name } });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
