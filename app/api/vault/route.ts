import {
  NextResponse,
} from "next/server"

import {
  getCurrentSession,
} from "@/lib/auth/session"

export const runtime =
  "nodejs"

const API_URL =
  (
    process.env.CRYPTICA_API_URL ||
    "https://api.crypticapp.org"
  ).replace(
    /\/+$/,
    "",
  )

const INTERNAL_API_KEY =
  process.env.CRYPTICA_INTERNAL_API_KEY ||
  process.env.CRYPTICA_INTERNAL_API_KEY

function getInternalHeaders(
  userId: string,
) {
  if (!INTERNAL_API_KEY) {
    throw new Error(
      "CRYPTICA_INTERNAL_API_KEY is not configured.",
    )
  }

return {
  "X-Internal-Key":
    INTERNAL_API_KEY,

  "X-Cryptica-User-Id":
    userId,

  Accept:
    "application/json",
}
}

async function parseResponse(
  response: Response,
) {
  const text =
    await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return {
      error: text,
    }
  }
}

function handleUpstreamResponse(
  response: Response,
  data: unknown,
) {
  /*
   * IMPORTANT:
   *
   * A 401 from api.crypticapp.org does NOT mean
   * the website session has expired.
   *
   * Only getCurrentSession() determines whether
   * the website user is authenticated.
   */
  if (
    response.status === 401 ||
    response.status === 403
  ) {
    return NextResponse.json(
      {
        error:
          "The Cryptica API rejected the website server authentication.",

        code:
          "UPSTREAM_UNAUTHORIZED",

        upstream:
          data,
      },
      {
        status: 502,
      },
    )
  }

  return NextResponse.json(
    data ?? {},
    {
      status:
        response.status,
    },
  )
}

export async function GET() {
  try {
    const session =
      await getCurrentSession()

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Authentication required.",

          code:
            "UNAUTHENTICATED",
        },
        {
          status: 401,
        },
      )
    }

    console.log(
      "[VAULT:PROXY:GET] API_URL:",
      API_URL,
    )

    console.log(
      "[VAULT:PROXY:GET] TARGET:",
      `${API_URL}/v1/vault`,
    )

    console.log(
      "[VAULT:PROXY:GET] USER:",
      session.user.id,
    )

    const response =
      await fetch(
        `${API_URL}/v1/vault`,
        {
          method:
            "GET",

          cache:
            "no-store",

          headers:
            getInternalHeaders(
              session.user.id,
            ),
        },
      )

    const data =
      await parseResponse(
        response,
      )

    console.log(
      "[VAULT:PROXY:GET] API STATUS:",
      response.status,
    )

    console.log(
      "[VAULT:PROXY:GET] API RESPONSE:",
      data,
    )

    return handleUpstreamResponse(
      response,
      data,
    )
  } catch (error) {
    console.error(
      "[VAULT:PROXY:GET]",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to load your vault.",

        code:
          "VAULT_PROXY_FAILED",
      },
      {
        status: 500,
      },
    )
  }
}

export async function POST(
  request: Request,
) {
  try {
    const session =
      await getCurrentSession()

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Authentication required.",

          code:
            "UNAUTHENTICATED",
        },
        {
          status: 401,
        },
      )
    }

    const body =
      await request.text()

    console.log(
      "[VAULT:PROXY:POST] TARGET:",
      `${API_URL}/v1/vault`,
    )

    console.log(
      "[VAULT:PROXY:POST] USER:",
      session.user.id,
    )

    const response =
      await fetch(
        `${API_URL}/v1/vault`,
        {
          method:
            "POST",

          cache:
            "no-store",

          headers: {
            ...getInternalHeaders(
              session.user.id,
            ),

            "Content-Type":
              "application/json",
          },

          body,
        },
      )

    const data =
      await parseResponse(
        response,
      )

    console.log(
      "[VAULT:PROXY:POST] API STATUS:",
      response.status,
    )

    console.log(
      "[VAULT:PROXY:POST] API RESPONSE:",
      data,
    )

    return handleUpstreamResponse(
      response,
      data,
    )
  } catch (error) {
    console.error(
      "[VAULT:PROXY:POST]",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to save this vault item.",

        code:
          "VAULT_PROXY_FAILED",
      },
      {
        status: 500,
      },
    )
  }
}