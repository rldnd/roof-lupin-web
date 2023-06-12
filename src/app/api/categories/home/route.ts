import { NextResponse } from "next/server";

import { fetchClient } from "@/services/apiClient";

export async function GET() {
  const response = await fetchClient("/categories/home");
  const data = await response.json();
  return NextResponse.json(data);
}
