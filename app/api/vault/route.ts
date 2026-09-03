import { NextResponse } from "next/server"

import {
  getCurrentSession,
} from "@/lib/auth/session"

import {
  decryptVaultPayload,
  encryptVaultPayload,
  type VaultLoginPayload,
} from "@/lib/vault/crypto"

import { prisma } from "@/lib/prisma"

export const runtime =
  "nodejs"

type CreateVaultEntryBody = {
  service?: unknown
  username?: unknown
  password?: unknown
  notes?: unknown
}

function cleanString(
  value: unknown,
) {
  return typeof value ===
    "string"
    ? value.trim()
    : ""
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
        },
        {
          status: 401,
        },
      )
    }

    const items =
      await prisma.vaultItem.findMany({
        where: {
          vault: {
            userId:
              session.user.id,
          },

          type:
            "LOGIN",

          deletedAt:
            null,
        },

        select: {
          id: true,
          ciphertext: true,
          nonce: true,
          authTag: true,
          favorite: true,
          createdAt: true,
          updatedAt: true,
        },

        orderBy: {
          updatedAt:
            "desc",
        },
      })

    const entries =
      items.flatMap(
        (item) => {
          if (!item.authTag) {
            console.error(
              "[VAULT] Missing auth tag:",
              item.id,
            )

            return []
          }

          try {
            const payload =
              decryptVaultPayload({
                ciphertext:
                  Buffer.from(
                    item.ciphertext,
                  ),

                nonce:
                  Buffer.from(
                    item.nonce,
                  ),

                authTag:
                  Buffer.from(
                    item.authTag,
                  ),
              })

            return [
              {
                id:
                  item.id,

                ...payload,

                favorite:
                  item.favorite,

                createdAt:
                  item.createdAt.toISOString(),

                updatedAt:
                  item.updatedAt.toISOString(),
              },
            ]
          } catch (error) {
            console.error(
              `[VAULT] Unable to decrypt ${item.id}:`,
              error,
            )

            return []
          }
        },
      )

    return NextResponse.json({
      ok: true,
      entries,
    })
  } catch (error) {
    console.error(
      "[VAULT:GET]",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to load your vault.",
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
        },
        {
          status: 401,
        },
      )
    }

    let body:
      CreateVaultEntryBody

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

    const service =
      cleanString(
        body.service,
      )

    const username =
      cleanString(
        body.username,
      )

    const password =
      typeof body.password ===
      "string"
        ? body.password
        : ""

    const notes =
      cleanString(
        body.notes,
      )

    if (!service) {
      return NextResponse.json(
        {
          error:
            "Service is required.",
        },
        {
          status: 400,
        },
      )
    }

    if (!password) {
      return NextResponse.json(
        {
          error:
            "Password is required.",
        },
        {
          status: 400,
        },
      )
    }

    if (
      service.length > 200
    ) {
      return NextResponse.json(
        {
          error:
            "Service name is too long.",
        },
        {
          status: 400,
        },
      )
    }

    if (
      username.length > 320
    ) {
      return NextResponse.json(
        {
          error:
            "Username is too long.",
        },
        {
          status: 400,
        },
      )
    }

    if (
      password.length >
      4096
    ) {
      return NextResponse.json(
        {
          error:
            "Password is too long.",
        },
        {
          status: 400,
        },
      )
    }

    if (
      notes.length > 5000
    ) {
      return NextResponse.json(
        {
          error:
            "Notes are too long.",
        },
        {
          status: 400,
        },
      )
    }

    /*
     * Use the user's first vault.
     *
     * Later we can support multiple vaults.
     */
    const vault =
      await prisma.vault.findFirst({
        where: {
          userId:
            session.user.id,
        },

        select: {
          id: true,
        },

        orderBy: {
          createdAt:
            "asc",
        },
      })

    if (!vault) {
      return NextResponse.json(
        {
          error:
            "Your encrypted vault has not been initialised yet.",

          code:
            "VAULT_SETUP_REQUIRED",
        },
        {
          status: 409,
        },
      )
    }

    const payload:
      VaultLoginPayload = {
        service,
        username,
        password,
        notes,
      }

    const encrypted =
      encryptVaultPayload(
        payload,
      )

    const item =
      await prisma.vaultItem.create({
        data: {
          vaultId:
            vault.id,

          type:
            "LOGIN",

          ciphertext:
            encrypted.ciphertext,

          nonce:
            encrypted.nonce,

          authTag:
            encrypted.authTag,

          version: 1,
          favorite: false,
        },

        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
        },
      })

    await prisma.auditEvent.create({
      data: {
        userId:
          session.user.id,

        type:
          "VAULT_ITEM_CREATED",

        metadata: {
          itemId:
            item.id,

          itemType:
            "LOGIN",
        },
      },
    })

    return NextResponse.json(
      {
        ok: true,

        entry: {
          id:
            item.id,

          ...payload,

          favorite:
            false,

          createdAt:
            item.createdAt.toISOString(),

          updatedAt:
            item.updatedAt.toISOString(),
        },
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    console.error(
      "[VAULT:POST]",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to save this vault item.",
      },
      {
        status: 500,
      },
    )
  }
}