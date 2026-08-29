import Image from "next/image"

const leadership = [
  {
    name: "Méschac Irung",
    role: "Creator",
    avatar: "https://avatars.githubusercontent.com/u/47919550?v=4",
  },
]

const engineering = [
  {
    name: "Théo Balick",
    role: "Frontend Dev",
    avatar: "https://avatars.githubusercontent.com/u/68236786?v=4",
  },
  {
    name: "Glodie Lukose",
    role: "Frontend Dev",
    avatar: "https://avatars.githubusercontent.com/u/99137927?v=4",
  },
  {
    name: "Bernard Ngandu",
    role: "Backend Dev",
    avatar: "https://avatars.githubusercontent.com/u/31113941?v=4",
  },
]

type TeamMember = {
  name: string
  role: string
  avatar: string
}

function TeamGroup({ title, members }: { title: string; members: TeamMember[] }) {
  return (
    <div className="border-t pt-6">
      <h3 className="mb-5 text-lg font-medium">{title}</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
        {members.map((member) => (
          <div key={member.name} className="min-w-0">
            <div className="bg-background size-20 rounded-full border p-0.5 shadow-sm">
              <Image
                className="aspect-square rounded-full object-cover"
                src={member.avatar}
                alt={member.name}
                height="460"
                width="460"
                loading="lazy"
              />
            </div>
            <span className="mt-2 block truncate text-sm font-medium">
              {member.name}
            </span>
            <span className="text-muted-foreground block text-xs">
              {member.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TeamSection() {
  return (
    <section className="rounded-lg border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold sm:text-4xl">Our team</h1>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          The people building private, approachable tools for safer digital
          lives.
        </p>
      </div>

      <div className="space-y-8">
        <TeamGroup title="Leadership" members={leadership} />
        <TeamGroup title="Engineering" members={engineering} />
      </div>
    </section>
  )
}