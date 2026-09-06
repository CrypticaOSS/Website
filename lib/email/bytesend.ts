import "server-only"

import { ByteSend } from "bytesend-js"

function maskSecret(
  value: string,
) {
  if (value.length <= 8) {
    return "***"
  }

  return `${value.slice(0, 4)}...${value.slice(-4)}`
}

function getByteSendConfig() {
  const apiKey =
    process.env.SMTP_PASSWORD?.trim()

  const from =
    process.env.EMAIL_FROM?.trim()

  if (!apiKey) {
    throw new Error(
      "SMTP_PASSWORD is not configured.",
    )
  }

  if (!from) {
    throw new Error(
      "EMAIL_FROM is not configured.",
    )
  }

  if (
    process.env.NODE_ENV ===
    "development"
  ) {
    console.log(
      "[BYTESEND] Configuration:",
      {
        apiKeySet: true,
        apiKeyPreview:
          maskSecret(apiKey),
        apiKeyLength:
          apiKey.length,
        from,
      },
    )
  }

  return {
    apiKey,
    from,
  }
}

const globalForByteSend =
  globalThis as unknown as {
    crypticaByteSend?: ByteSend
  }

export function getByteSend() {
  if (
    globalForByteSend.crypticaByteSend
  ) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "[BYTESEND] Reusing cached ByteSend client.",
      )
    }

    return globalForByteSend
      .crypticaByteSend
  }

  const {
    apiKey,
  } = getByteSendConfig()

  if (
    process.env.NODE_ENV ===
    "development"
  ) {
    console.log(
      "[BYTESEND] Creating ByteSend client...",
    )
  }

  const client =
    new ByteSend(apiKey)

  if (
    process.env.NODE_ENV !==
    "production"
  ) {
    globalForByteSend.crypticaByteSend =
      client
  }

  return client
}

export function getByteSendFromAddress() {
  return getByteSendConfig().from
}