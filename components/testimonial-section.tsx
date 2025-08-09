import React from 'react';
import { useTranslations } from "next-intl";

interface TestimonialProps {
  name: string;
  title?: string;
  content: string;
  avatarInitial?: string;
  contentKey?: string;
}

export default function TestimonialSection() {
  const t = useTranslations();

  const testimonials: TestimonialProps[] = [
    {
      name: t('testimonial-1-name', { default: 'Alex P.' }),
      content: t('testimonial-1', { default: 'Cryptica made password management effortless and secure. The UI is beautiful and intuitive!' }),
      avatarInitial: 'A',
    },
    {
      name: t('testimonial-2-name', { default: 'Morgan S.' }),
      content: t('testimonial-2', { default: 'I love the custom themes and the quick password generator. Highly recommended!' }),
      avatarInitial: 'M',
    },
    {
      name: t('testimonial-3-name', { default: 'Jamie L.' }),
      content: t('testimonial-3', { default: 'The breach checker is a game changer. I feel much safer online now.' }),
      avatarInitial: 'J',
    },
  ];

  const avatarColors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-amber-500',
    'bg-rose-500',
  ];

  return (
    <div className="w-full py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">{t('testimonial-title', { default: 'What Users Are Saying' })}</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="rounded-xl border bg-card p-6 shadow">
            <div className="mb-4">
              <span className="text-primary text-4xl font-serif">&quot;</span>
              <p className="text-muted-foreground">{testimonial.content}</p>
              <span className="text-primary text-4xl font-serif float-right">&quot;</span>
            </div>

            <div className="flex items-center mt-6">
              {testimonial.avatarInitial && (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${avatarColors[index % avatarColors.length]}`}>
                  {testimonial.avatarInitial}
                </div>
              )}
              <div className="ml-3">
                <div className="font-medium">{testimonial.name}</div>
                {testimonial.title && (
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
