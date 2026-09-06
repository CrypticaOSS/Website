import "server-only"

import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto"

export type VaultLoginPayload = {
  service: string
  username: string
  password: string
  notes: string
}

function getEncryptionKey() {
  const secret =
    process.env.CRYPTICA_ENCRYPTION_KEY?.trim()

  if (!secret) {
    throw new Error(
      "CRYPTICA_ENCRYPTION_KEY is not configured.",
    )
  }

  if (secret.length < 32) {
    throw new Error(
      "CRYPTICA_ENCRYPTION_KEY must be at least 32 characters long.",
    )
  }

  /*
   * Derive exactly 32 bytes for AES-256.
   */
  return createHash("sha256")
    .update(secret)
    .digest()
}

export function encryptVaultPayload(
  payload: VaultLoginPayload,
) {
  const key =
    getEncryptionKey()

  const nonce =
    randomBytes(12)

  const cipher =
    createCipheriv(
      "aes-256-gcm",
      key,
      nonce,
    )

  const plaintext =
    Buffer.from(
      JSON.stringify(payload),
      "utf8",
    )

  const ciphertext =
    Buffer.concat([
      cipher.update(plaintext),
      cipher.final(),
    ])

  const authTag =
    cipher.getAuthTag()

  return {
    ciphertext,
    nonce,
    authTag,
  }
}

export function decryptVaultPayload({
  ciphertext,
  nonce,
  authTag,
}: {
  ciphertext: Buffer
  nonce: Buffer
  authTag: Buffer
}) {
  const key =
    getEncryptionKey()

  const decipher =
    createDecipheriv(
      "aes-256-gcm",
      key,
      nonce,
    )

  decipher.setAuthTag(
    authTag,
  )

  const plaintext =
    Buffer.concat([
      decipher.update(
        ciphertext,
      ),
      decipher.final(),
    ])

  return JSON.parse(
    plaintext.toString(
      "utf8",
    ),
  ) as VaultLoginPayload
}