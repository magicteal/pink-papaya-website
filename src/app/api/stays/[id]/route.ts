import { NextRequest, NextResponse } from "next/server"; // <-- Yahan NextRequest import karein
import { deleteStay, getStayById, updateStay } from "@/lib/staysStore";

export async function GET(
  _req: NextRequest, // <-- Request ko NextRequest se badlein
  { params }: { params: { id: string } }
) {
  const stay = await getStayById(params.id);
  if (!stay) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(stay);
}

export async function PATCH(
  req: NextRequest, // <-- Request ko NextRequest se badlein
  { params }: { params: { id: string } }
) {
  try {
    const patch = await req.json();
    const updated = await updateStay(params.id, patch);
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed to update" }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest, // <-- Request ko NextRequest se badlein
  { params }: { params: { id: string } }
) {
  try {
    await deleteStay(params.id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed to delete" }, { status: 400 });
  }
}