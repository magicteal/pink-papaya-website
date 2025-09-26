import { NextResponse } from "next/server";
import { deletePost, getPostById, updatePost } from "@/lib/blogStore";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const post = await getPostById(params.id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const patch = await req.json();
    const updated = await updatePost(params.id, patch);
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed to update post" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await deletePost(params.id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed to delete post" }, { status: 400 });
  }
}
