import { NextRequest, NextResponse } from "next/server";
import { deleteStay, getStayById, updateStay, type Stay } from "@/lib/staysStore";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(_req: NextRequest, { params }: RouteParams): Promise<NextResponse<Stay | { error: string }>> {
  try {
    const stay = await getStayById(params.id);
    if (!stay) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(stay);
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to fetch stay" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const patch = await req.json();
    const updated = await updateStay(params.id, patch);
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed to update" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  try {
    await deleteStay(params.id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed to delete" }, { status: 400 });
  }
}