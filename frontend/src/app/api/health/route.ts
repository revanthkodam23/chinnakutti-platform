import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "chinnakutti-frontend",
    timestamp: new Date().toISOString()
  });
}
