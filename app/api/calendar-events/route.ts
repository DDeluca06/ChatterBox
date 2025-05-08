import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET: List all events for the authenticated user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const events = await prisma.calendarEvent.findMany({
    where: { userId: user.id },
    orderBy: { date: "asc" },
  });
  return NextResponse.json(events);
}

// POST: Create a new event
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const { title, description, date } = await req.json();
  if (!title || !date) {
    return NextResponse.json({ error: "Title and date are required" }, { status: 400 });
  }
  const event = await prisma.calendarEvent.create({
    data: {
      title,
      description,
      date: new Date(date),
      userId: user.id,
    },
  });
  return NextResponse.json(event);
}

// PUT: Update an event
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const { id, title, description, date } = await req.json();
  if (!id || !title || !date) {
    return NextResponse.json({ error: "ID, title, and date are required" }, { status: 400 });
  }
  const event = await prisma.calendarEvent.update({
    where: { id: Number(id), userId: user.id },
    data: {
      title,
      description,
      date: new Date(date),
    },
  });
  return NextResponse.json(event);
}

// DELETE: Delete an event
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  await prisma.calendarEvent.delete({
    where: { id: Number(id), userId: user.id },
  });
  return NextResponse.json({ success: true });
} 