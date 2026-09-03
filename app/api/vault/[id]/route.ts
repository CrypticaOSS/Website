import { NextResponse } from "next/server"

import {
  getCurrentSession,
} from "@/lib/auth/session"

import { prisma } from "@/lib/prisma"

export const runtime =
  "nodejs"

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

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Vault item ID is required.",
        },
        {
          status: 400,
        },
      )
    }

    const existing =
      await prisma.vaultItem.findFirst({
        where: {
          id,

          vault: {
            userId:
              session.user.id,
          },

          deletedAt:
            null,
        },

        select: {
          id: true,
        },
      })

    if (!existing) {
      return NextResponse.json(
        {
          error:
            "Vault item not found.",
        },
        {
          status: 404,
        },
      )
    }

    await prisma.vaultItem.update({
      where: {
        id,
      },

      data: {
        deletedAt:
          new Date(),
      },
    })

    await prisma.auditEvent.create({
      data: {
        userId:
          session.user.id,

        type:
          "VAULT_ITEM_DELETED",

        metadata: {
          itemId:
            id,
        },
      },
    })

    return NextResponse.json({
      ok: true,
    })
  } catch (error) {
    console.error(
      "[VAULT:DELETE]",
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