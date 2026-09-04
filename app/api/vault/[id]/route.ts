import {
  NextResponse,
} from "next/server"

import {
  getCurrentSession,
} from "@/lib/auth/session"

export const runtime =
  "nodejs"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

const API_URL =
  (
    process.env
      .CRYPTICA_API_URL ||
    "https://api.crypticapp.org"
  ).replace(
    /\/+$/,
    "",
  )

const INTERNAL_API_KEY =
  process.env
    .CRYPTICA_INTERNAL_API_KEY

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

export async function PATCH(
  request: Request,
  context: RouteContext,
) {
  try {
    const session =
      await getCurrentSession()

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Authentication required.",
        },
        {
          status: 401,
        },
      )
    }

    const {
      id,
    } =
      await context.params

    const body =
      await request.text()

    const response =
      await fetch(
        `${API_URL}/v1/vault/${encodeURIComponent(
          id,
        )}`,
        {
          method:
            "PATCH",

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
      await response.json()

    return NextResponse.json(
      data,
      {
        status:
          response.status,
      },
    )
  } catch (error) {
    console.error(
      "[VAULT:PROXY:PATCH]",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to update this vault item.",
      },
      {
        status: 500,
      },
    )
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext,
) {
  try {
    const session =
      await getCurrentSession()

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Authentication required.",
        },
        {
          status: 401,
        },
      )
    }

    const {
      id,
    } =
      await context.params

    const response =
      await fetch(
        `${API_URL}/v1/vault/${encodeURIComponent(
          id,
        )}`,
        {
          method:
            "DELETE",

          cache:
            "no-store",

          headers:
            getInternalHeaders(
              session.user.id,
            ),
        },
      )

    const data =
      await response.json()

    return NextResponse.json(
      data,
      {
        status:
          response.status,
      },
    )
  } catch (error) {
    console.error(
      "[VAULT:PROXY:DELETE]",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to delete this vault item.",
      },
      {
        status: 500,
      },
    )
  }
}