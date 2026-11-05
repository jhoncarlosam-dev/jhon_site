import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  let visitorId = request.cookies.get("visitor_id")?.value;
  const isNew = !visitorId;
  if (!visitorId) visitorId = crypto.randomUUID();
  const segment =
    request.cookies.get("segment")?.value === "subscriber"
      ? "subscriber"
      : "visitor";
  requestHeaders.set("x-visitor-id", visitorId);
  requestHeaders.set("x-segment", segment);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  if (isNew) {
    response.cookies.set("visitor_id", visitorId, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
