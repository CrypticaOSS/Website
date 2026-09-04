"use client";

import { useState } from "react";

import {
  ArrowRight,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Pro",
    description:
      "Everything you need to keep your passwords secure across your devices.",
    monthlyPrice: 0,
    annualPrice: 0,
    suffix: "forever",
    button: "Get started",
    popular: false,
    features: [
      "Unlimited password storage",
      "Secure encrypted vault",
      "Password generator",
      "Desktop application access",
      "Automatic vault syncing",
      "Personal security dashboard",
    ],
  },
  {
    name: "Family",
    description:
      "Protect the people closest to you with shared access and extra controls.",
    monthlyPrice: 4.99,
    annualPrice: 3.99,
    suffix: "month",
    button: "Choose Family",
    popular: true,
    features: [
      "Everything included in Pro",
      "Up to 6 family members",
      "Individual private vaults",
      "Secure shared credentials",
      "Family management",
      "Priority support",
    ],
  },
  {
    name: "Business",
    description:
      "Password management and security controls built for growing teams.",
    monthlyPrice: null,
    annualPrice: null,
    suffix: "",
    button: "Contact us",
    popular: false,
    features: [
      "Everything included in Family",
      "Team vaults",
      "Centralised administration",
      "User access controls",
      "Audit and activity logs",
      "Priority business support",
    ],
  },
];

export const Component = () => {
  const [isAnnual, setIsAnnual] =
    useState(true);

  return (
    <section className="relative isolate w-full overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-background" />

      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="pointer-events-none absolute -left-64 top-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize:
            "72px 72px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Simple, secure pricing
          </div>

          <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            Security without the
            <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
              complicated pricing.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">
            Choose the plan that fits you.
            Your passwords stay encrypted,
            protected and available wherever
            you need them.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-border/70 bg-card/60 p-1 shadow-lg shadow-black/5 backdrop-blur-xl">
              <button
                type="button"
                onClick={() =>
                  setIsAnnual(false)
                }
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  !isAnnual
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Monthly
              </button>

              <button
                type="button"
                onClick={() =>
                  setIsAnnual(true)
                }
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  isAnnual
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Annually

                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    isAnnual
                      ? "bg-background/15 text-background"
                      : "bg-primary/10 text-primary",
                  )}
                >
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            const price =
              isAnnual
                ? plan.annualPrice
                : plan.monthlyPrice;

            return (
              <article
                key={plan.name}
                className={cn(
                  "group relative flex min-h-[590px] flex-col overflow-hidden rounded-[28px] border p-7 transition-all duration-300 sm:p-8",
                  plan.popular
                    ? "border-primary/40 bg-card/80 shadow-2xl shadow-primary/10 backdrop-blur-2xl"
                    : "border-border/70 bg-card/50 shadow-xl shadow-black/5 backdrop-blur-xl hover:-translate-y-1 hover:border-border",
                )}
              >
                {/* Popular glow */}
                {plan.popular && (
                  <>
                    <div className="pointer-events-none absolute inset-x-12 -top-20 h-40 rounded-full bg-primary/20 blur-[60px]" />

                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                  </>
                )}

                <div className="relative z-10 flex h-full flex-col">
                  {/* Plan heading */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-background/50 shadow-sm">
                        <ShieldCheck
                          className={cn(
                            "h-5 w-5",
                            plan.popular
                              ? "text-primary"
                              : "text-muted-foreground",
                          )}
                        />
                      </div>

                      <h3 className="text-xl font-semibold tracking-tight text-foreground">
                        {plan.name}
                      </h3>
                    </div>

                    {plan.popular && (
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                        Most popular
                      </span>
                    )}
                  </div>

                  <p className="mt-3 min-h-[48px] text-sm leading-6 text-muted-foreground">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-8">
                    {price === null ? (
                      <div className="flex h-[52px] items-end">
                        <span className="text-4xl font-semibold tracking-[-0.04em] text-foreground">
                          Custom
                        </span>
                      </div>
                    ) : price === 0 ? (
                      <div className="flex items-end gap-2">
                        <span className="text-5xl font-semibold tracking-[-0.05em] text-foreground">
                          £0
                        </span>

                        <span className="mb-1 text-sm text-muted-foreground">
                          / forever
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-end gap-2">
                        <span className="text-5xl font-semibold tracking-[-0.05em] text-foreground">
                          £
                          {price.toFixed(
                            2,
                          )}
                        </span>

                        <span className="mb-1 text-sm text-muted-foreground">
                          / {plan.suffix}
                        </span>
                      </div>
                    )}

                    {price !== null &&
                      price !== 0 && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          {isAnnual
                            ? "Billed annually"
                            : "Billed monthly"}
                        </p>
                      )}
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    className={cn(
                      "mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98]",
                      plan.popular
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                        : "border border-border bg-background/40 text-foreground hover:border-primary/30 hover:bg-muted/60",
                    )}
                  >
                    {plan.button}

                    {plan.popular && (
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    )}
                  </button>

                  <div className="my-7 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Features */}
                  <div className="flex-1">
                    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Included
                    </p>

                    <ul className="space-y-4">
                      {plan.features.map(
                        (feature) => (
                          <li
                            key={
                              feature
                            }
                            className="flex items-start gap-3 text-sm leading-5 text-muted-foreground"
                          >
                            <span
                              className={cn(
                                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                                plan.popular
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-foreground/70",
                              )}
                            >
                              <Check className="h-3 w-3" />
                            </span>

                            <span>
                              {
                                feature
                              }
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>

            Cancel or change your plan
            whenever you need.
          </div>

          <span className="hidden text-border sm:inline">
            •
          </span>

          <span>
            Your vault remains encrypted
            and private.
          </span>
        </div>
      </div>
    </section>
  );
};