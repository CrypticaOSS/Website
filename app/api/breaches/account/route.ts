import { NextResponse } from "next/server"

import { getCurrentSession } from "@/lib/auth/session"

export const runtime = "nodejs"

const HIBP_BASE_URL =
  "https://haveibeenpwned.com/api/v3"

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type HibpBreach = {
  Name: string
  Title: string
  Domain: string
  BreachDate: string
  AddedDate: string
  ModifiedDate: string
  PwnCount: number
  Description: string
  LogoPath: string
  DataClasses: string[]
  IsVerified: boolean
  IsFabricated: boolean
  IsSensitive: boolean
  IsRetired: boolean
  IsSpamList: boolean
  IsMalware: boolean
  IsSubscriptionFree: boolean
}

function normaliseEmail(
  value: unknown,
) {
  if (
    typeof value !==
    "string"
  ) {
    return ""
  }

  return value
    .trim()
    .toLowerCase()
}

export async function POST(
  request: Request,
) {
  try {
    /*
     * Keep arbitrary account searching behind authentication.
     */
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

    const apiKey =
      process.env.HIBP_API_KEY?.trim()

    if (!apiKey) {
      console.error(
        "[BREACHES:ACCOUNT] HIBP_API_KEY is missing.",
      )

      return NextResponse.json(
        {
          error:
            "Breach search is not configured.",
          code:
            "HIBP_NOT_CONFIGURED",
        },
        {
          status: 503,
        },
      )
    }

    let body: {
      email?: unknown
    }

    try {
      body =
        await request.json()
    } catch {
      return NextResponse.json(
        {
          error:
            "Invalid request body.",
        },
        {
          status: 400,
        },
      )
    }

    const email =
      normaliseEmail(
        body.email,
      )

    if (
      !email ||
      !EMAIL_REGEX.test(
        email,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Enter a valid email address.",
        },
        {
          status: 400,
        },
      )
    }

    if (
      email.length >
      320
    ) {
      return NextResponse.json(
        {
          error:
            "Email address is too long.",
        },
        {
          status: 400,
        },
      )
    }

    const controller =
      new AbortController()

    const timeout =
      setTimeout(
        () =>
          controller.abort(),
        10_000,
      )

    let response:
      Response

    try {
      response =
        await fetch(
          `${HIBP_BASE_URL}/breachedAccount/${encodeURIComponent(
            email,
          )}?truncateResponse=false`,
          {
            method:
              "GET",

            headers: {
              "hibp-api-key":
                apiKey,

              "user-agent":
                "Cryptica-Breach-Centre/1.0",

              accept:
                "application/json",
            },

            cache:
              "no-store",

            signal:
              controller.signal,
          },
        )
    } finally {
      clearTimeout(
        timeout,
      )
    }

    /*
     * HIBP uses 404 to mean the account wasn't
     * found in the breach corpus.
     */
    if (
      response.status ===
      404
    ) {
      return NextResponse.json({
        ok: true,

        breached:
          false,

        email,

        totalBreaches:
          0,

        breaches: [],
      })
    }

    if (
      response.status ===
      401
    ) {
      console.error(
        "[BREACHES:ACCOUNT] HIBP API key rejected.",
      )

      return NextResponse.json(
        {
          error:
            "Breach search authentication failed.",
          code:
            "HIBP_AUTH_FAILED",
        },
        {
          status: 502,
        },
      )
    }

    if (
      response.status ===
      403
    ) {
      return NextResponse.json(
        {
          error:
            "Your HIBP subscription does not permit this search.",
          code:
            "HIBP_FORBIDDEN",
        },
        {
          status: 502,
        },
      )
    }

    if (
      response.status ===
      429
    ) {
      const retryAfter =
        response.headers.get(
          "retry-after",
        )

      return NextResponse.json(
        {
          error:
            "The breach service is being queried too quickly. Please try again shortly.",

          code:
            "HIBP_RATE_LIMITED",

          retryAfter:
            retryAfter
              ? Number(
                  retryAfter,
                )
              : null,
        },
        {
          status: 429,
        },
      )
    }

    if (!response.ok) {
      console.error(
        "[BREACHES:ACCOUNT] Unexpected HIBP response:",
        response.status,
      )

      return NextResponse.json(
        {
          error:
            "Unable to search breach data.",
          code:
            "HIBP_ERROR",
        },
        {
          status: 502,
        },
      )
    }

    const breaches =
      (await response.json()) as
        HibpBreach[]

    const safeBreaches =
      breaches.map(
        (breach) => ({
          name:
            breach.Name,

          title:
            breach.Title,

          domain:
            breach.Domain,

          breachDate:
            breach.BreachDate,

          addedDate:
            breach.AddedDate,

          modifiedDate:
            breach.ModifiedDate,

          affectedAccounts:
            breach.PwnCount,

          description:
            breach.Description,

          logo:
            breach.LogoPath,

          dataClasses:
            breach.DataClasses,

          verified:
            breach.IsVerified,

          fabricated:
            breach.IsFabricated,

          spamList:
            breach.IsSpamList,

          malware:
            breach.IsMalware,
        }),
      )

    return NextResponse.json({
      ok: true,

      breached:
        safeBreaches.length >
        0,

      email,

      totalBreaches:
        safeBreaches.length,

      breaches:
        safeBreaches,
    })
  } catch (error) {
    if (
      error instanceof
        Error &&
      error.name ===
        "AbortError"
    ) {
      return NextResponse.json(
        {
          error:
            "The breach service timed out.",
          code:
            "HIBP_TIMEOUT",
        },
        {
          status: 504,
        },
      )
    }

    console.error(
      "[BREACHES:ACCOUNT] Search failed:",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to search breach data.",
      },
      {
        status: 500,
      },
    )
  }
}