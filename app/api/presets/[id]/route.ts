import { NextResponse } from "next/server"

import { getCurrentSession } from "@/lib/auth/session"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

type RouteContext = {
  params: Promise<{
    id: string
  }>
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
          error: "Authentication required.",
        },
        {
          status: 401,
        },
      )
    }

    const { id } =
      await context.params

    const preset =
      await prisma.passwordPreset.findFirst({
        where: {
          id,
          userId:
            session.user.id,
        },

        select: {
          id: true,
        },
      })

    if (!preset) {
      return NextResponse.json(
        {
          error:
            "Preset not found.",
        },
        {
          status: 404,
        },
      )
    }

    await prisma.passwordPreset.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({
      ok: true,
    })
  } catch (error) {
    console.error(
      "[PRESETS:DELETE]",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to delete preset.",
      },
      {
        status: 500,
      },
    )
  }
}