import { NextResponse } from "next/server"

import { getCurrentSession } from "@/lib/auth/session"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

type RangeConfig = {
  included?: unknown
  min?: unknown
  max?: unknown
  useRange?: unknown
}

type PresetBody = {
  name?: unknown
  length?: unknown
  lowerCases?: RangeConfig
  upperCases?: RangeConfig
  numbers?: RangeConfig
  special?: RangeConfig
}

function parseInteger(
  value: unknown,
  fallback: number,
) {
  if (
    typeof value !== "number" ||
    !Number.isInteger(value)
  ) {
    return fallback
  }

  return value
}

function parseRange(
  value: RangeConfig | undefined,
) {
  const min = Math.max(
    0,
    parseInteger(
      value?.min,
      0,
    ),
  )

  const max = Math.max(
    min,
    parseInteger(
      value?.max,
      10,
    ),
  )

  return {
    included:
      value?.included === true,

    min,

    max,

    useRange:
      value?.useRange === true,
  }
}

export async function GET() {
  try {
    const session =
      await getCurrentSession()

    if (!session) {
      return NextResponse.json(
        {
          error: "Authentication required.",
        },
        {
          status: 401,
        },
      )
    }

    const presets =
      await prisma.passwordPreset.findMany({
        where: {
          userId: session.user.id,
        },

        orderBy: {
          createdAt: "desc",
        },
      })

    return NextResponse.json({
      ok: true,

      presets: presets.map(
        (preset) => ({
          id: preset.id,
          name: preset.name,
          length: preset.length,

          lowerCases: {
            included:
              preset.lowerIncluded,

            min:
              preset.lowerMin,

            max:
              preset.lowerMax,

            useRange:
              preset.lowerUseRange,
          },

          upperCases: {
            included:
              preset.upperIncluded,

            min:
              preset.upperMin,

            max:
              preset.upperMax,

            useRange:
              preset.upperUseRange,
          },

          numbers: {
            included:
              preset.numberIncluded,

            min:
              preset.numberMin,

            max:
              preset.numberMax,

            useRange:
              preset.numberUseRange,
          },

          special: {
            included:
              preset.specialIncluded,

            min:
              preset.specialMin,

            max:
              preset.specialMax,

            useRange:
              preset.specialUseRange,
          },

          createdAt:
            preset.createdAt.toISOString(),

          updatedAt:
            preset.updatedAt.toISOString(),
        }),
      ),
    })
  } catch (error) {
    console.error(
      "[PRESETS:GET]",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to load presets.",
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
          error: "Authentication required.",
        },
        {
          status: 401,
        },
      )
    }

    let body: PresetBody

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

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : ""

    const length =
      parseInteger(
        body.length,
        16,
      )

    if (!name) {
      return NextResponse.json(
        {
          error:
            "Preset name is required.",
        },
        {
          status: 400,
        },
      )
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          error:
            "Preset name is too long.",
        },
        {
          status: 400,
        },
      )
    }

    if (
      length < 4 ||
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

    const lower =
      parseRange(
        body.lowerCases,
      )

    const upper =
      parseRange(
        body.upperCases,
      )

    const numbers =
      parseRange(
        body.numbers,
      )

    const special =
      parseRange(
        body.special,
      )

    if (
      !lower.included &&
      !upper.included &&
      !numbers.included &&
      !special.included
    ) {
      return NextResponse.json(
        {
          error:
            "Select at least one character type.",
        },
        {
          status: 400,
        },
      )
    }

    const preset =
      await prisma.passwordPreset.create({
        data: {
          userId:
            session.user.id,

          name,

          length,

          lowerIncluded:
            lower.included,

          lowerMin:
            lower.min,

          lowerMax:
            lower.max,

          lowerUseRange:
            lower.useRange,

          upperIncluded:
            upper.included,

          upperMin:
            upper.min,

          upperMax:
            upper.max,

          upperUseRange:
            upper.useRange,

          numberIncluded:
            numbers.included,

          numberMin:
            numbers.min,

          numberMax:
            numbers.max,

          numberUseRange:
            numbers.useRange,

          specialIncluded:
            special.included,

          specialMin:
            special.min,

          specialMax:
            special.max,

          specialUseRange:
            special.useRange,
        },
      })

    return NextResponse.json(
      {
        ok: true,

        preset: {
          id:
            preset.id,

          name:
            preset.name,

          length:
            preset.length,

          lowerCases:
            lower,

          upperCases:
            upper,

          numbers,

          special,

          createdAt:
            preset.createdAt.toISOString(),

          updatedAt:
            preset.updatedAt.toISOString(),
        },
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    console.error(
      "[PRESETS:POST]",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to create preset.",
      },
      {
        status: 500,
      },
    )
  }
}