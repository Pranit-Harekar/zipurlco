import { EmailConfig } from '@auth/core/providers/email'
import { Theme } from '@auth/core/types'

export async function sendVerificationRequest(params: {
  identifier: string
  url: string
  expires: Date
  provider: EmailConfig
  token: string
  theme: Theme
  request: Request
}) {
  const { identifier: to, provider, url, theme } = params
  const { host } = new URL(url)
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: 'Log in with this magic link',
      html: html({ url }),
      text: text({ url, host }),
    }),
  })

  if (!res.ok) throw new Error('Resend error: ' + JSON.stringify(await res.json()))
}

function html(params: { url: string }) {
  const { url } = params

  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" lang="en">
    <head>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    </head>
    <div
      style="
        display: none;
        overflow: hidden;
        line-height: 1px;
        opacity: 0;
        max-height: 0;
        max-width: 0;
      "
    >
      Log in with this magic link.
    </div>
    <body
      style="
        background-color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
          Cantarell, 'Helvetica Neue', sans-serif;
      "
    >
      <table
        align="center"
        width="100%"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="
          max-width: 37.5em;
          margin: 0 auto;
          padding: 20px 25px 48px;
          background-image: url('/https://github.com/Pranit-Harekar/zipurlco/assets/17886017/2cdaaeeb-5b4e-4f9d-8528-9e790ae7051e');
          background-position: bottom;
          background-repeat: no-repeat, no-repeat;
        "
      >
        <tbody>
          <tr style="width: 100%">
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="32"
                zoomAndPan="magnify"
                viewBox="0 0 375 374.999991"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                version="1.0"
              >
                <defs>
                  <g />
                  <clipPath id="3fe7fd507d">
                    <path
                      d="M 0 0 L 374.859375 0 L 374.859375 374.859375 L 0 374.859375 Z M 0 0 "
                      clip-rule="nonzero"
                    />
                  </clipPath>
                </defs>
                <rect
                  x="-37.5"
                  width="450"
                  fill="#ffffff"
                  y="-37.499999"
                  height="449.999989"
                  fill-opacity="1"
                />
                <rect
                  x="-37.5"
                  width="450"
                  fill="#ffffff"
                  y="-37.499999"
                  height="449.999989"
                  fill-opacity="1"
                />
                <g clip-path="url(#3fe7fd507d)">
                  <path
                    fill="#3b82f6"
                    d="M 0 0 L 374.972656 0 L 374.972656 374.972656 L 0 374.972656 Z M 0 0 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                </g>
                <g fill="#ffffff" fill-opacity="1">
                  <g transform="translate(96.519832, 286.217215)">
                    <g>
                      <path
                        d="M 178.625 -195.703125 L 81.609375 -39.140625 L 172.21875 -39.140625 L 172.21875 0 L 3.796875 0 L 100.578125 -156.5625 L 17.546875 -156.5625 L 17.546875 -195.703125 Z M 178.625 -195.703125 "
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <h1 style="font-size: 28px; font-weight: bold; margin-top: 48px">🪄 Your magic link</h1>
              <table
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="margin: 24px 0"
              >
                <tbody>
                  <tr>
                    <td>
                      <p style="font-size: 16px; line-height: 26px; margin: 16px 0">
                        <a href="${url}" style="color: #0090ff; text-decoration: none" target="_blank"
                          >👉 Click here to sign in 👈</a
                        >
                      </p>
                      <p style="font-size: 16px; line-height: 26px; margin: 16px 0">
                        If you didn&#x27;t request this, please ignore this email.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; line-height: 26px; margin: 16px 0">
                Best,<br />- ZipURL Team
              </p>
              <hr
                style="
                  width: 100%;
                  border: none;
                  border-top: 1px solid #eaeaea;
                  border-color: #dddddd;
                  margin-top: 48px;
                  margin-bottom: 32px;
                "
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="25"
                zoomAndPan="magnify"
                viewBox="0 0 375 374.999991"
                height="25"
                preserveAspectRatio="xMidYMid meet"
                version="1.0"
              >
                <defs>
                  <g />
                  <clipPath id="fe1e47c464">
                    <path
                      d="M 0 0 L 374.859375 0 L 374.859375 374.859375 L 0 374.859375 Z M 0 0 "
                      clip-rule="nonzero"
                    />
                  </clipPath>
                </defs>
                <rect
                  x="-37.5"
                  width="450"
                  fill="#ffffff"
                  y="-37.499999"
                  height="449.999989"
                  fill-opacity="1"
                />
                <rect
                  x="-37.5"
                  width="450"
                  fill="#ffffff"
                  y="-37.499999"
                  height="449.999989"
                  fill-opacity="1"
                />
                <g clip-path="url(#fe1e47c464)">
                  <path
                    fill="#a6a6a6"
                    d="M 0 0 L 374.972656 0 L 374.972656 374.972656 L 0 374.972656 Z M 0 0 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                </g>
                <g fill="#ffffff" fill-opacity="1">
                  <g transform="translate(96.519832, 286.217215)">
                    <g>
                      <path
                        d="M 178.625 -195.703125 L 81.609375 -39.140625 L 172.21875 -39.140625 L 172.21875 0 L 3.796875 0 L 100.578125 -156.5625 L 17.546875 -156.5625 L 17.546875 -195.703125 Z M 178.625 -195.703125 "
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <p style="font-size: 12px; line-height: 24px; margin: 16px 0; color: #8898aa">
                ZipURL Inc.
              </p>
              <p style="font-size: 12px; line-height: 24px; margin: 16px 0; color: #8898aa">
                Your trusted link management platform ❤️
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  `
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}
