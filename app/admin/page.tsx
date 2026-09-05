import Link from "next/link"

import {
  CreditCard,
  ShieldCheck,
  Users,
  Vault,
} from "lucide-react"

import {
  requireAdmin,
} from "@/lib/auth/admin"

export default async function AdminPage() {
  const session =
    await requireAdmin()

  return (
    <div className="mx-auto w-full max-w-6xl py-6">
      <div className="mb-8">
        <div
          className="
            mb-4 inline-flex items-center gap-2
            rounded-full
            border border-primary/15
            bg-primary/10
            px-3 py-1.5
            text-xs font-semibold
            text-primary
          "
        >
          <ShieldCheck className="size-3.5" />
          Cryptica Administration
        </div>

        <h1
          className="
            text-3xl font-extrabold
            tracking-[-0.035em]
            sm:text-4xl
          "
        >
          Admin dashboard
        </h1>

        <p
          className="
            mt-3
            text-sm
            text-muted-foreground
          "
        >
          Signed in as{" "}
          {session.user.email}
        </p>
      </div>

      <div
        className="
          grid gap-4
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        <AdminCard
          href="/admin/users"
          icon={Users}
          title="Users"
          description="Manage Cryptica users, roles and account state."
        />

        <AdminCard
          href="/admin/subscriptions"
          icon={CreditCard}
          title="Subscriptions"
          description="View and manage premium plans and subscriptions."
        />

        <AdminCard
          href="/admin/vaults"
          icon={Vault}
          title="Vault statistics"
          description="View vault usage metadata without exposing vault contents."
        />
      </div>
    </div>
  )
}

function AdminCard({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string
  icon: React.ComponentType<{
    className?: string
  }>
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="
        rounded-2xl
        border border-border/70
        bg-card/50
        p-5
        transition-colors
        hover:border-primary/20
        hover:bg-card/70
      "
    >
      <div
        className="
          mb-4
          flex size-10
          items-center justify-center
          rounded-xl
          bg-primary/10
          text-primary
        "
      >
        <Icon className="size-5" />
      </div>

      <h2 className="font-bold">
        {title}
      </h2>

      <p
        className="
          mt-2
          text-sm leading-6
          text-muted-foreground
        "
      >
        {description}
      </p>
    </Link>
  )
}