const API_URL =
  process.env.CRYPTICA_API_URL ??
  "http://localhost:4000"

const INTERNAL_KEY =
  process.env.CRYPTICA_API_INTERNAL_KEY

export class CrypticaApiError extends Error {
  status: number
  code?: string

  constructor(
    message: string,
    status: number,
    code?: string
  ) {
    super(message)

    this.name = "CrypticaApiError"
    this.status = status
    this.code = code
  }
}

type ApproveDeviceInput = {
  userCode: string
  userId: string
}

export async function approveDevice({
  userCode,
  userId,
}: ApproveDeviceInput) {
  if (!INTERNAL_KEY) {
    throw new Error(
      "CRYPTICA_API_INTERNAL_KEY is not configured."
    )
  }

  const response = await fetch(
    `${API_URL}/v1/auth/device/approve`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-internal-key": INTERNAL_KEY,
      },

      body: JSON.stringify({
        user_code: userCode,
        user_id: userId,
      }),

      cache: "no-store",
    }
  )

  const data = await response
    .json()
    .catch(() => null)

  if (!response.ok) {
    throw new CrypticaApiError(
      data?.error?.message ??
        "Unable to approve this device.",
      response.status,
      data?.error?.code
    )
  }

  return data as {
    approved: boolean
  }
}