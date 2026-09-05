import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar?: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ author, text, href, className }: TestimonialCardProps) {
  const Card = href ? "a" : "article"

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "group flex w-[20rem] shrink-0 flex-col rounded-lg border border-border/70 border-t-primary/60",
        "bg-gradient-to-b from-muted/70 to-card p-5 text-left shadow-sm transition-colors duration-300",
        "hover:from-muted hover:to-card sm:w-[22rem] sm:p-6",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-11 w-11 border border-border/70">
          {author.avatar && <AvatarImage src={author.avatar} alt={author.name} />}
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-none">{author.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{author.handle}</p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-muted-foreground sm:text-base">{text}</p>
    </Card>
  )
}