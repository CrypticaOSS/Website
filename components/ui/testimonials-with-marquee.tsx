import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"
import { cn } from "@/lib/utils"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const repeatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section className={cn("overflow-hidden py-20 sm:py-28", className)}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 text-center sm:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4 px-4 sm:gap-5">
          <p className="text-sm font-semibold text-primary">Community feedback</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
        </div>

        <div className="relative flex w-full overflow-hidden">
          <div className="testimonial-marquee flex w-max gap-4 px-2 sm:gap-6">
            {repeatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.author.name}-${index}`} {...testimonial} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-background to-transparent sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-background to-transparent sm:block" />
        </div>
      </div>
    </section>
  )
}