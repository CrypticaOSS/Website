"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import NumberFlow from "@number-flow/react";
import { CheckCheck } from "lucide-react";
import { motion, useInView, type Variants } from "motion/react";
import { type ReactNode, useRef, useState } from "react";

const plans = [
	{
		name: "Pro",
		description:
			"Great for small businesses and startups looking to get started with AI",
		price: 2.99,
		yearlyPrice: 24.99,
		buttonText: "Get started",
		buttonVariant: "outline" as const,
    popular: true,
		includes: [
			"Unlimited Password Generator",
			"Unlimited Advanced Password Generators",
			"Password Strength Analyzer",
			"Unlimited Passowords Into Vault",
      "Stronger Encryption Passwords",
      "Breach Monitoring (2 usages / day)",
		],
	},
	{
		name: "Family",
		description:
			"Best value for growing businesses that need more advanced features",
		price: 9.99,
		yearlyPrice: 39.99,
		buttonText: "Get started",
		buttonVariant: "default" as const,
		popular: false,
		includes: [
			"Unlimited Password Generator",
			"Unlimited Advanced Password Generators",
			"Password Strength Analyzer",
			"Unlimited Passowords Into Vault / per user [4 users]",
      "Stronger Encryption Passwords",
      "Breach Monitoring (20 usages / per user [4 users])",
      "Multi-User Team Management / Owner manages up to 4 users",
		],
	},
	{
		name: "Business",
		description:
			"Advanced plan with enhanced security and unlimited access for large teams",
		price: 11.99,
		yearlyPrice: 119.99,
		buttonText: "Get started",
		buttonVariant: "outline" as const,
		includes: [
			"Unlimited Password Generator",
			"Unlimited Advanced Password Generators",
			"Password Strength Analyzer",
			"Unlimited Passowords Into Vault / per user [4 users]",
      "Stronger Encryption Passwords",
      "Breach Monitoring (20 usages / per user [4 users])",
      "Multi-User Team Management / Owners manage users, shared vaults, and permissions",
		],
	},
];

function TimelineContent({
	animationNum,
	children,
	className,
	customVariants,
	as: Component = "div",
}: {
	animationNum: number;
	children: ReactNode;
	className?: string;
	customVariants: Variants;
	as?: "div" | "h2" | "p" | "span";
}) {
	const contentRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(contentRef, { once: true, amount: 0.2 });

	return (
		<motion.div
			ref={contentRef}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			custom={animationNum}
			variants={customVariants}
			className={className}
		>
			<Component>{children}</Component>
		</motion.div>
	);
}

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
	const [selected, setSelected] = useState("0");

	const handleSwitch = (value: string) => {
		setSelected(value);
		onSwitch(value);
	};

	return (
		<div className="flex justify-center">
			<div className="relative z-50 mx-auto flex w-fit rounded-full border border-border/80 bg-card/80 p-1 shadow-sm backdrop-blur-sm">
				{[
					{ value: "0", label: "Monthly" },
					{ value: "1", label: "Yearly" },
				].map((option) => (
					<button
						key={option.value}
						onClick={() => handleSwitch(option.value)}
						className={`relative z-10 h-10 rounded-full px-3 py-1 font-medium transition-colors sm:h-11 sm:px-6 sm:py-2 ${
							selected === option.value
								? "text-primary-foreground"
								: "text-muted-foreground hover:text-foreground"
						}`}
					>
						{selected === option.value && (
							<motion.span
								layoutId="switch"
								className="absolute inset-0 h-full w-full rounded-full border-2 border-primary bg-primary shadow-sm shadow-primary/30"
								transition={{ type: "spring", stiffness: 500, damping: 30 }}
							/>
						)}
						<span className="relative flex items-center gap-2">
							{option.label}
							{option.value === "1" && (
								<span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
									Save 20%
								</span>
							)}
						</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default function PricingSection() {
	const [isYearly, setIsYearly] = useState(false);
	const pricingRef = useRef<HTMLDivElement>(null);

	const revealVariants: Variants = {
		visible: (index: number) => ({
			y: 0,
			opacity: 1,
			filter: "blur(0px)",
			transition: { delay: index * 0.4, duration: 0.5 },
		}),
		hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
	};

	return (
		<div
			className="relative mx-auto min-h-screen overflow-hidden rounded-2xl bg-background px-4 pt-20 text-foreground"
			style={{
				backgroundImage:
					"linear-gradient(to right, var(--cryptica-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--cryptica-grid) 1px, transparent 1px), radial-gradient(circle at 50% 0%, var(--cryptica-glow-strong), transparent 42rem)",
				backgroundSize: "64px 64px, 64px 64px, 100% 100%",
			}}
			ref={pricingRef}
		>
			<div className="relative z-10 mx-auto mb-6 max-w-3xl text-center">
				<TimelineContent
					as="h2"
					animationNum={0}
					customVariants={revealVariants}
					className="mx-auto mb-4 max-w-4xl text-4xl leading-[1.08] font-medium text-foreground sm:text-5xl md:text-6xl"
				>
					Plans that works best for{" "}
					<span className="inline-block rounded-xl border border-dashed border-primary/60 bg-primary/15 px-2 py-1 text-primary capitalize">
						You
					</span>
				</TimelineContent>
				<TimelineContent
					as="p"
					animationNum={2}
					customVariants={revealVariants}
					className="mx-auto w-[80%] text-sm text-muted-foreground sm:w-[70%] sm:text-base"
				>
					Trusted by thousands, We help you all around the world, Explore which
					option is right for you.
				</TimelineContent>
			</div>

			<div className="relative z-10 pb-12">
				<TimelineContent
					as="div"
					animationNum={3}
					customVariants={revealVariants}
				>
					<PricingSwitch
						onSwitch={(value) => setIsYearly(Number.parseInt(value) === 1)}
					/>
				</TimelineContent>

				<div className="mx-auto grid max-w-7xl gap-4 py-6 md:grid-cols-3">
					{plans.map((plan, index) => (
						<TimelineContent
							key={plan.name}
							animationNum={4 + index}
							customVariants={revealVariants}
						>
							<Card
								className={`relative border-border/80 ${
									plan.popular ? "bg-accent/70 ring-2 ring-primary" : "bg-card/90"
								}`}
							>
								<CardHeader className="text-left">
									<div className="flex justify-between">
										<h3 className="mb-2 text-3xl font-semibold text-card-foreground">
											{plan.name}
										</h3>
										{plan.popular && (
													<span className="h-fit rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
												Popular
											</span>
										)}
									</div>
									<p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>
									<div className="flex items-baseline">
										<span className="text-4xl font-semibold text-card-foreground">
											$
											<NumberFlow
												value={isYearly ? plan.yearlyPrice : plan.price}
												className="text-4xl font-semibold"
											/>
										</span>
										<span className="ml-1 text-muted-foreground">
											/{isYearly ? "year" : "month"}
										</span>
									</div>
								</CardHeader>

								<CardContent className="pt-0">
									<button
										type="button"
										className={`mb-6 flex w-full items-center justify-center rounded-xl border p-4 text-xl font-medium backdrop-blur-md transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none cursor-pointer ${
											plan.popular
												? "border-primary/80 bg-primary/85 text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary"
												: "border-border/80 bg-background/35 text-foreground shadow-sm hover:border-primary/60 hover:bg-accent/60"
										}`}
									>
										{plan.buttonText}
									</button>
									<div className="space-y-3 border-t border-border pt-4">
										<h4 className="mb-3 text-base font-medium text-card-foreground">
											{plan.includes[0]}
										</h4>
										<ul className="space-y-2 font-semibold">
											{plan.includes.slice(1).map((feature, featureIndex) => (
												<li key={featureIndex} className="flex items-center">
													<span className="mr-3 mt-0.5 grid h-6 w-6 shrink-0 place-content-center rounded-full border border-primary bg-accent">
														<CheckCheck className="h-4 w-4 text-primary" />
													</span>
													<span className="text-sm text-muted-foreground">{feature}</span>
												</li>
											))}
										</ul>
									</div>
								</CardContent>
							</Card>
						</TimelineContent>
					))}
				</div>
			</div>
		</div>
	);
}
