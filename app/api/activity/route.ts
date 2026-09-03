import { NextResponse } from "next/server"

import {
  getCurrentSession,
} from "@/lib/auth/session"

import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

const ALLOWED_ACTIVITY_TYPES = [
  "PASSWORD_GENERATED",
] as const

type ActivityType =
  (typeof ALLOWED_ACTIVITY_TYPES)[number]

type CreateActivityBody = {
  type?: unknown
  strength?: unknown
  length?: unknown
  source?: unknown
}

function isValidActivityType(
  value: unknown,
): value is ActivityType {
  return (
    typeof value === "string" &&
    ALLOWED_ACTIVITY_TYPES.includes(
      value as ActivityType,
    )
  )
}

function cleanString(
  value: unknown,
) {
  return typeof value === "string"
    ? value.trim()
    : ""
}

/*
 * ------------------------------------------------------------
 * GET /api/activity
 * ------------------------------------------------------------
 *
 * Returns activity belonging only to the currently authenticated user.
 */
export async function GET() {
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

    const activities =
      await prisma.auditEvent.findMany({
        where: {
          userId:
            session.user.id,

          type: {
            in: [
              "PASSWORD_GENERATED",
            ],
          },
        },

        select: {
          id: true,
          type: true,
          metadata: true,
          createdAt: true,
        },

        orderBy: {
          createdAt:
            "desc",
        },

        take: 250,
      })

    const items =
      activities.map(
        (activity) => {
          const metadata =
            activity.metadata &&
            typeof activity.metadata ===
              "object" &&
            !Array.isArray(
              activity.metadata,
            )
              ? activity.metadata
              : {}

          return {
            id:
              activity.id,

            type:
              activity.type,

            strength:
              typeof metadata.strength ===
              "string"
                ? metadata.strength
                : null,

            length:
              typeof metadata.length ===
              "number"
                ? metadata.length
                : null,

            source:
              typeof metadata.source ===
              "string"
                ? metadata.source
                : null,

            createdAt:
              activity.createdAt.toISOString(),
          }
        },
      )

    return NextResponse.json({
      ok: true,
      items,
      total:
        items.length,
    })
  } catch (error) {
    console.error(
      "[ACTIVITY:GET] Failed to load activity:",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to load activity.",
      },
      {
        status: 500,
      },
    )
  }
}

/*
 * ------------------------------------------------------------
 * POST /api/activity
 * ------------------------------------------------------------
 *
 * Records SAFE metadata only.
 *
 * Never send or store the actual generated password here.
 */
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
        },
        {
          status: 401,
        },
      )
    }

    let body:
      CreateActivityBody

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

    if (
      !isValidActivityType(
        body.type,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid activity type.",
        },
        {
          status: 400,
        },
      )
    }

    const strength =
      cleanString(
        body.strength,
      )

    const source =
      cleanString(
        body.source,
      )

    const length =
      typeof body.length ===
        "number" &&
      Number.isInteger(
        body.length,
      )
        ? body.length
        : null

    if (
      body.type ===
      "PASSWORD_GENERATED"
    ) {
      if (
        !strength
      ) {
        return NextResponse.json(
          {
            error:
              "Password strength is required.",
          },
          {
            status: 400,
          },
        )
      }

      if (
        length === null ||
        length < 1 ||
        length > 4096
      ) {
        return NextResponse.json(
          {
            error:
              "Password length is invalid.",
          },
          {
            status: 400,
          },
        )
      }
    }

    const activity =
      await prisma.auditEvent.create({
        data: {
          userId:
            session.user.id,

          type:
            body.type,

          metadata: {
            strength,

            length,

            source:
              source ||
              "generator",
          },
        },

        select: {
          id: true,
          type: true,
          metadata: true,
          createdAt: true,
        },
      })

    return NextResponse.json(
      {
        ok: true,

        activity: {
          id:
            activity.id,

          type:
            activity.type,

          strength,

          length,

          source:
            source ||
            "generator",

          createdAt:
            activity.createdAt.toISOString(),
        },
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    console.error(
      "[ACTIVITY:POST] Failed to create activity:",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to record activity.",
      },
      {
        status: 500,
      },
    )
  }
}

/*
 * ------------------------------------------------------------
 * DELETE /api/activity
 * ------------------------------------------------------------
 *
 * Clears password-generation activity for the current user only.
 *
 * This deliberately leaves important security/account audit events intact.
 */
export async function DELETE() {
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

    const result =
      await prisma.auditEvent.deleteMany({
        where: {
          userId:
            session.user.id,

          type: {
            in: [
              "PASSWORD_GENERATED",
            ],
          },
        },
      })

    return NextResponse.json({
      ok: true,

      deleted:
        result.count,
    })
  } catch (error) {
    console.error(
      "[ACTIVITY:DELETE] Failed to clear activity:",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to clear activity.",
      },
      {
        status: 500,
      },
    )
  }
}