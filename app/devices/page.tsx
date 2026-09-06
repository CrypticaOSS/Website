import { requireSession } from "@/lib/auth/session"

import { ConnectedDevicesClient } from "./connected-devices-client"

export const dynamic = "force-dynamic"

export default async function DevicesPage() {
  await requireSession()

  return <ConnectedDevicesClient />
}
