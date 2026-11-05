import { NextResponse } from "next/server";

const base = process.env.CONTENT_API_URL ?? "http://127.0.0.1:4000";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const response = await fetch(`${base}/v1/leads`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = await response.json();
    const next = NextResponse.json(payload, { status: response.status });
    if (response.status === 201) {
      next.cookies.set("segment", "subscriber", {
        path: "/",
        sameSite: "lax",
        httpOnly: true,
      });
    }
    return next;
  } catch {
    return NextResponse.json(
      { errors: { form: "The content service did not respond." } },
      { status: 502 },
    );
  }
}
