import {
  requireAdmin,
} from "@/lib/auth/admin"

import {
  prisma,
} from "@/lib/prisma"

type AdminUser = {
  id: string
  name: string | null
  email: string
  role: string
  emailVerifiedAt: Date | null
  createdAt: Date
  subscriptions: Array<{
    plan: {
      name: string
    }
  }>
}

export default async function AdminUsersPage() {
  await requireAdmin()

  const users: AdminUser[] =
    await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerifiedAt: true,
        createdAt: true,

        subscriptions: {
          where: {
            status: "ACTIVE",
          },

          include: {
            plan: true,
          },

          take: 1,
        },
      },

      take: 100,
    })

  return (
    <div className="mx-auto w-full max-w-6xl py-6">
      <div className="mb-8">
        <h1
          className="
            text-3xl
            font-extrabold
            tracking-tight
          "
        >
          Users
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-muted-foreground
          "
        >
          Manage registered
          Cryptica accounts.
        </p>
      </div>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-border/70
        "
      >
        <div
          className="
            overflow-x-auto
          "
        >
          <table className="w-full text-left">
            <thead
              className="
                border-b
                border-border/70
                bg-muted/30
              "
            >
              <tr>
                <th className="px-4 py-3 text-xs font-semibold">
                  User
                </th>

                <th className="px-4 py-3 text-xs font-semibold">
                  Role
                </th>

                <th className="px-4 py-3 text-xs font-semibold">
                  Verified
                </th>

                <th className="px-4 py-3 text-xs font-semibold">
                  Plan
                </th>

                <th className="px-4 py-3 text-xs font-semibold">
                  Joined
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map(
                (user) => {
                  const activeSubscription =
                    user
                      .subscriptions[0]

                  return (
                    <tr
                      key={user.id}
                      className="
                        border-b
                        border-border/50
                        last:border-0
                      "
                    >
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-semibold">
                            {user.name ??
                              "Unnamed user"}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {
                              user.email
                            }
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm">
                        {user.role}
                      </td>

                      <td className="px-4 py-4 text-sm">
                        {user.emailVerifiedAt
                          ? "Yes"
                          : "No"}
                      </td>

                      <td className="px-4 py-4 text-sm">
                        {activeSubscription
                          ?.plan.name ??
                          "Free"}
                      </td>

                      <td className="px-4 py-4 text-sm text-muted-foreground">
                        {user.createdAt.toLocaleDateString(
                          "en-GB",
                        )}
                      </td>
                    </tr>
                  )
                },
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}