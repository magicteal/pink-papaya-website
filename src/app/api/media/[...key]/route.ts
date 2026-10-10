import fs from "fs/promises";
import path from "path";
import { env } from "@/lib/env";

const CONTENT_TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

/**
 * Dev-only fallback for serving local media. In production, Nginx serves
 * /media/ directly from MEDIA_DIR and this route is never hit.
 */
export async function GET(req: Request, props: { params: Promise<{ key: string[] }> }) {
  const params = await props.params;
  const keyParts = params.key;
  const mediaDir = env.MEDIA_DIR || path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(mediaDir, ...keyParts);

  if (filePath.startsWith(path.resolve(mediaDir))) {
    try {
      const data = await fs.readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      return new Response(new Uint8Array(data), {
        headers: {
          "Content-Type": CONTENT_TYPES[ext] || "application/octet-stream",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch {
      // File not found on local disk, attempt proxy from live VPS below
    }
  }

  // Remote VPS Fallback: In dev, CMS media lives on VPS disk (/srv/papaya-media).
  const proxyOrigin = env.MEDIA_PROXY_ORIGIN || "http://187.127.187.184";
  try {
    const remoteUrl = `${proxyOrigin}/media/${keyParts.join("/")}`;
    const remoteRes = await fetch(remoteUrl);
    if (remoteRes.ok) {
      const arrayBuffer = await remoteRes.arrayBuffer();
      const contentType = remoteRes.headers.get("content-type") || "application/octet-stream";
      return new Response(arrayBuffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch {
    // Remote proxy failed
  }

  return new Response("Not found", { status: 404 });
}

