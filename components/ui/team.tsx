import Image from "next/image"

const Managers = [
  {
    name: "Connor2000024",
    role: "Manager & Developer",
    avatar: "/profiles/connor.png",
  },
   {
    name: "Harley200317",
    role: "Manager & Developer",
    avatar: "/profiles/harley.webp",
  },
     {
    name: "Cxntrol",
    role: "Manager & Developer",
    avatar: "/profiles/cxntrol.jpg",
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
          A team dedicated to building private, secure tools for a safer digital experience.
        </p>
      </div>

      <div className="space-y-8">
        <TeamGroup title="Managers" members={Managers} />
      </div>
    </section>
  )
}