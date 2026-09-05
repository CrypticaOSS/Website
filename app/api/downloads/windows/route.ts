import {
  NextResponse,
} from "next/server"

import {
  getCurrentSession,
} from "@/lib/auth/session"

export const runtime =
  "nodejs"

export const dynamic =
  "force-dynamic"

const UPDATE_BASE_URL =
  (
    process.env
      .CRYPTICA_UPDATE_API_URL ||
    "https://api.crypticapp.org/v1/updates"
  ).replace(
    /\/+$/,
    "",
  )

function getLatestInstallerName(
  text: string,
) {
  const path =
    text.match(
      /^path:\s*["']?([^"'\r\n]+)["']?\s*$/m,
    )?.[1]?.trim()

  if (path) {
    return path
  }

  return (
    text.match(
      /^\s*-\s*url:\s*["']?([^"'\r\n]+)["']?\s*$/m,
    )?.[1]?.trim() ??
    null
  )
}

export async function GET(
  request: Request,
) {
  try {
    const session =
      await getCurrentSession()

    if (!session) {
      const loginUrl =
        new URL(
          "/login",
          request.url,
        )

      loginUrl.searchParams.set(
        "callbackUrl",
        "/downloads",
      )

      return NextResponse.redirect(
        loginUrl,
      )
    }

    const metadataResponse =
      await fetch(
        `${UPDATE_BASE_URL}/windows/latest.yml`,
        {
          cache:
            "no-store",

          headers: {
            Accept:
              "text/yaml,text/plain;q=0.9,*/*;q=0.8",
          },
        },
      )

    if (
      !metadataResponse.ok
    ) {
      console.error(
        "[DOWNLOADS] latest.yml request failed:",
        metadataResponse.status,
        metadataResponse.statusText,
      )

      return NextResponse.json(
        {
          error:
            "The latest Cryptica release is currently unavailable.",
        },
        {
          status: 502,
        },
      )
    }

    const metadata =
      await metadataResponse.text()

    const filename =
      getLatestInstallerName(
        metadata,
      )

    if (
      !filename ||
      !filename
        .toLowerCase()
        .endsWith(
          ".exe",
        )
    ) {
      console.error(
        "[DOWNLOADS] Unable to resolve installer from latest.yml",
      )

      return NextResponse.json(
        {
          error:
            "The latest Windows installer could not be resolved.",
        },
        {
          status: 502,
        },
      )
    }

    const upstreamUrl =
      `${UPDATE_BASE_URL}/windows/${encodeURIComponent(filename)}`

    const upstreamResponse =
      await fetch(
        upstreamUrl,
        {
          method:
            "GET",

          cache:
            "no-store",

          headers: {
            Accept:
              "application/octet-stream",
          },
        },
      )

    if (
      !upstreamResponse.ok ||
      !upstreamResponse.body
    ) {
      console.error(
        "[DOWNLOADS] Installer request failed:",
        upstreamResponse.status,
        upstreamResponse.statusText,
      )

      return NextResponse.json(
        {
          error:
            "The Cryptica installer could not be downloaded.",
        },
        {
          status:
            upstreamResponse.status ===
            404
              ? 404
              : 502,
        },
      )
    }

    const headers =
      new Headers()

    headers.set(
      "Content-Type",
      upstreamResponse.headers.get(
        "content-type",
      ) ||
        "application/octet-stream",
    )

    headers.set(
      "Content-Disposition",
      `attachment; filename="${filename.replace(
        /["\\]/g,
        "",
      )}"`,
    )

    headers.set(
      "Cache-Control",
      "private, no-store, max-age=0",
    )

    const contentLength =
      upstreamResponse.headers.get(
        "content-length",
      )

    if (
      contentLength
    ) {
      headers.set(
        "Content-Length",
        contentLength,
      )
    }

    return new Response(
      upstreamResponse.body,
      {
        status: 200,
        headers,
      },
    )
  } catch (error) {
    console.error(
      "[DOWNLOADS:WINDOWS]",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to download Cryptica right now.",
      },
      {
        status: 500,
      },
    )
  }
}
