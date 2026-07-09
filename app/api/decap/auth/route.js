import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new NextResponse(
      "Missing GITHUB_OAUTH_CLIENT_ID environment variable.",
      { status: 500 }
    );
  }

  const state = crypto.randomBytes(16).toString("hex");
  cookies().set("decap_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });

  const redirectUri = new URL("/api/decap/callback", request.url).toString();

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", state);

  return NextResponse.redirect(authorizeUrl.toString());
}
