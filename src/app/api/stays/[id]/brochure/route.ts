import { NextRequest, NextResponse } from "next/server";
import { getStayById } from "@/lib/staysStore";
import fs from "fs";
import path from "path";

type AsyncRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, context: AsyncRouteContext) {
  try {
    const { id } = await context.params;
    const stay = await getStayById(id);

    const safeTitle = (stay?.title || "Property")
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    const downloadFilename = `${safeTitle}-Pink-Papaya-Brochure.pdf`;

    // 1. If property has a custom brochure URL set
    if (stay?.brochureUrl && stay.brochureUrl.trim() !== "") {
      const url = stay.brochureUrl.trim();

      // If it's an external full URL
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return NextResponse.redirect(url, 302);
      }

      // If it's a local /media/uploads/... or /uploads/... path
      if (url.startsWith("/media/uploads/") || url.startsWith("/uploads/")) {
        // Construct file path in public or redirect
        const cleanPath = url.replace(/^\/media\//, "/");
        const localFilePath = path.join(process.cwd(), "public", cleanPath);
        if (fs.existsSync(localFilePath)) {
          const fileBuffer = fs.readFileSync(localFilePath);
          return new NextResponse(fileBuffer, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `attachment; filename="${downloadFilename}"`,
            },
          });
        }
        return NextResponse.redirect(new URL(url, req.url), 302);
      }

      return NextResponse.redirect(new URL(url, req.url), 302);
    }

    // 2. Default fallback brochure PDF
    const fallbackPdf = path.join(process.cwd(), "public", "brochures", "pink-papaya-brochure.pdf");
    const testPdf = path.join(process.cwd(), "public", "test.pdf");

    const pdfPathToServe = fs.existsSync(fallbackPdf)
      ? fallbackPdf
      : fs.existsSync(testPdf)
      ? testPdf
      : null;

    if (pdfPathToServe) {
      const fileBuffer = fs.readFileSync(pdfPathToServe);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${downloadFilename}"`,
        },
      });
    }

    return NextResponse.json({ error: "Brochure not available" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Internal error" }, { status: 500 });
  }
}
