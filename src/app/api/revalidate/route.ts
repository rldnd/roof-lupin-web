import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  if (typeof tag === "string") revalidateTag(tag);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
