import "server-only"

import {
  getByteSend,
  getByteSendFromAddress,
} from "@/lib/email/bytesend"

type SendVerificationEmailOptions = {
  to: string
  name: string
  token: string
}

function escapeHtml(
  value: string,
) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export async function sendVerificationEmail({
  to,
  name,
  token,
}: SendVerificationEmailOptions) {
  const appUrl =
    (
      process.env
        .NEXT_PUBLIC_APP_URL ??
      "http://localhost:3000"
    ).replace(/\/+$/, "")

  const verificationUrl =
    `${appUrl}/api/auth/verify-email?token=${encodeURIComponent(token)}`

  const safeName =
    escapeHtml(
      name ||
        "Cryptica user",
    )

  const safeVerificationUrl =
    escapeHtml(
      verificationUrl,
    )

  const from =
    getByteSendFromAddress()

  const bytesend =
    getByteSend()

  console.log(
    "[BYTESEND] Sending verification email:",
    {
      to,
      from,
      subject:
        "Verify your Cryptica account",
    },
  )

  try {
    const result =
      await bytesend.emails.send({
        to,
        from,

        subject:
          "Verify your Cryptica account",

        text: [
          `Hi ${name || "there"},`,
          "",
          "Welcome to Cryptica.",
          "",
          "Please verify your email address by opening the link below:",
          "",
          verificationUrl,
          "",
          "This verification link expires in 30 minutes.",
          "",
          "If you did not create a Cryptica account, you can ignore this email.",
          "",
          "Cryptica",
        ].join("\n"),

        html: `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    />

    <title>
      Verify your Cryptica account
    </title>
  </head>

  <body
    style="
      margin:0;
      padding:0;
      background:#080d18;
      color:#f4f7fb;
      font-family:
        Arial,
        Helvetica,
        sans-serif;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        width:100%;
        background:#080d18;
        padding:40px 16px;
      "
    >
      <tr>
        <td align="center">

          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="
              width:100%;
              max-width:600px;
              border:1px solid #1d2b41;
              border-radius:18px;
              background:#0e1625;
              overflow:hidden;
            "
          >

            <tr>
              <td
                style="
                  padding:32px;
                "
              >
                <div
                  style="
                    margin-bottom:24px;
                    font-size:22px;
                    font-weight:800;
                    color:#ffffff;
                  "
                >
                  Cryptica
                </div>

                <h1
                  style="
                    margin:0;
                    font-size:26px;
                    line-height:1.25;
                    color:#ffffff;
                  "
                >
                  Verify your email
                </h1>

                <p
                  style="
                    margin:18px 0 0;
                    font-size:15px;
                    line-height:1.7;
                    color:#9daabc;
                  "
                >
                  Hi ${safeName},
                </p>

                <p
                  style="
                    margin:12px 0 0;
                    font-size:15px;
                    line-height:1.7;
                    color:#9daabc;
                  "
                >
                  Please verify your email
                  address to finish setting up
                  your Cryptica account.
                </p>

                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="
                    margin-top:26px;
                  "
                >
                  <tr>
                    <td
                      bgcolor="#3487f5"
                      style="
                        border-radius:10px;
                      "
                    >
                      <a
                        href="${safeVerificationUrl}"
                        style="
                          display:inline-block;
                          padding:13px 20px;
                          color:#ffffff;
                          font-size:14px;
                          font-weight:700;
                          text-decoration:none;
                        "
                      >
                        Verify email address
                      </a>
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    margin:24px 0 0;
                    font-size:13px;
                    line-height:1.6;
                    color:#75849a;
                  "
                >
                  This verification link
                  expires in 30 minutes.
                </p>

                <p
                  style="
                    margin:12px 0 0;
                    font-size:13px;
                    line-height:1.6;
                    color:#75849a;
                  "
                >
                  If you did not create this
                  Cryptica account, you can
                  safely ignore this email.
                </p>

                <div
                  style="
                    margin-top:28px;
                    padding-top:22px;
                    border-top:1px solid #1d2b41;
                    font-size:12px;
                    line-height:1.6;
                    color:#65758a;
                  "
                >
                  Cryptica — privacy-first
                  password security.
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
        `.trim(),

        headers: {
          "X-Campaign":
            "email-verification",
        },
      })

    console.log(
      "[BYTESEND] Verification email accepted:",
      result,
    )

    return result
  } catch (error) {
    console.error(
      "[BYTESEND] Verification email failed:",
      error,
    )

    throw error
  }
}