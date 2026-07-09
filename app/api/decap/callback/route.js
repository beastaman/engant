import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function renderPage(message) {
  return `<!DOCTYPE html>
<html>
<body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      ${JSON.stringify(message)},
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const cookieStore = cookies();
  const expectedState = cookieStore.get("decap_oauth_state")?.value;
  cookieStore.delete("decap_oauth_state");

  if (!code || !state || state !== expectedState) {
    return new NextResponse("Invalid or expired OAuth state.", {
      status: 400,
    });
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  const redirectUri = new URL("/api/decap/callback", request.url).toString();

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return new NextResponse(
      `GitHub OAuth error: ${tokenData.error_description || "unknown error"}`,
      { status: 400 }
    );
  }

  const message = `authorization:github:success:${JSON.stringify({
    token: tokenData.access_token,
    provider: "github",
  })}`;

  return new NextResponse(renderPage(message), {
    headers: { "Content-Type": "text/html" },
  });
}
