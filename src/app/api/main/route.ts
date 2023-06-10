import "server-only";

import { NextResponse } from "next/server";

import { MAIN_REVALIDATE } from "@/common/constants";
import { fetchClient } from "@/services/apiClient";

export async function GET() {
  const response = await fetchClient("/main", { revalidate: MAIN_REVALIDATE });
  const data = await response.json();
  return NextResponse.json(data);
}
