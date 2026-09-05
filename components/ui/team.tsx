import Image from "next/image"
import {
  Code2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

const managers = [
  {
    name: "Connor",
    role: "Manager & Developer",
    avatar: "/profiles/connor.png",
  },
  {
    name: "Harley",
    role: "Manager & Developer",
    avatar: "/profiles/harley.webp",
  },
  {
    name: "William",
    role: "Manager & Developer",
    avatar: "/profiles/william.jpg",
  },
]

type TeamMember = {
  name: string
  role: string
  avatar: string
}

function TeamMemberCard({
  member,
}: {
  member: TeamMember
}) {
  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        border border-border/70
        bg-card/55 p-5
        backdrop-blur-xl
        transition-all duration-200
        hover:border-primary/20
        hover:bg-card/80
        hover:shadow-lg
      "
    >
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 h-20
          bg-linear-to-b from-primary/[0.07] to-transparent
          opacity-0 transition-opacity duration-200
          group-hover:opacity-100
        "
      />

      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div
            className="
              relative size-20 shrink-0 overflow-hidden
              rounded-2xl
              border border-border/80
              bg-background
              p-1
              shadow-sm
            "
          >
            <Image
              src={member.avatar}
              alt={member.name}
              width={160}
              height={160}
              loading="lazy"
              className="
                size-full rounded-xl
                object-cover
                transition-transform duration-300
                group-hover:scale-[1.03]
              "
            />
          </div>

          <div
            className="
              flex size-9 shrink-0 items-center justify-center
              rounded-xl
              border border-primary/15
              bg-primary/10
              text-primary
            "
          >
            <Code2 className="size-4" />
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold tracking-tight">
            {member.name}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {member.role}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span
            className="
              inline-flex items-center gap-1.5
              rounded-full
              border border-primary/15
              bg-primary/[0.07]
              px-2.5 py-1
              text-[10px] font-bold
              uppercase tracking-[0.08em]
              text-primary
            "
          >
            <ShieldCheck className="size-3" />
            Cryptica team
          </span>
        </div>
      </div>
    </div>
  )
}

function TeamGroup({
  title,
  description,
  members,
}: {
  title: string
  description?: string
  members: TeamMember[]
}) {
  return (
    <div>
      <div className="mb-5 flex items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight">
              {title}
            </h2>

            <span
              className="
                rounded-full
                bg-secondary px-2 py-0.5
                text-[10px] font-bold
                text-muted-foreground
              "
            >
              {members.length}
            </span>
          </div>

          {description && (
            <p className="mt-1.5 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <TeamMemberCard
            key={member.name}
            member={member}
          />
        ))}
      </div>
    </div>
  )
}

export default function TeamSection() {
  return (
    <section
      className="
        relative overflow-hidden
        rounded-3xl
        border border-border/70
        bg-card/45
        p-6
        shadow-sm
        backdrop-blur-xl
        sm:p-8
        lg:p-10
      "
    >
      <div
        className="
          pointer-events-none absolute -right-32 -top-32
          size-80 rounded-full
          bg-primary/[0.07]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 h-px
          bg-linear-to-r
          from-transparent
          via-primary/30
          to-transparent
      "
      />

      <div className="relative">
        <div className="mb-10 max-w-2xl">
          <div
            className="
              mb-4 inline-flex items-center gap-2
              rounded-full
              border border-primary/15
              bg-primary/[0.07]
              px-3 py-1.5
              text-xs font-semibold
              text-primary
            "
          >
            <Sparkles className="size-3.5" />
            The people behind Cryptica
          </div>

          <div className="flex items-start gap-4">
            <div
              className="
                hidden size-12 shrink-0
                items-center justify-center
                rounded-2xl
                border border-primary/15
                bg-primary/10
                text-primary
                sm:flex
              "
            >
              <Users className="size-5" />
            </div>

            <div>
              <h1
                className="
                  text-3xl font-extrabold
                  tracking-[-0.035em]
                  sm:text-4xl
                "
              >
                Meet our team
              </h1>

              <p
                className="
                  mt-3 max-w-xl
                  text-sm leading-6
                  text-muted-foreground
                  sm:text-base sm:leading-7
                "
              >
                The team building and maintaining Cryptica, focused on
                creating private, secure and easy-to-use tools for protecting
                your digital life.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/60 pt-8">
          <TeamGroup
            title="Management"
            description="Leading the development, direction and day-to-day operation of Cryptica."
            members={managers}
          />
        </div>
      </div>
    </section>
  )
}