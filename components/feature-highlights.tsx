import React from 'react';
import Image from 'next/image';

interface Feature {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  titleKey?: string;
  descriptionKey?: string;
}

interface FeatureHighlightsProps {
  title: string;
  features: Feature[];
}

export default function FeatureHighlights({ title, features }: FeatureHighlightsProps) {

  return (
    <div className="w-full py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>

      <div className="grid gap-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
          >
            {/* Text Content */}
            <div className="flex-1">
              <div className="mb-2 flex items-center">
                {feature.icon && (
                  <span className="icon-f text-primary text-3xl mr-2">{feature.icon}</span>
                )}
                <h3 className="text-2xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>

            {/* Image/Visual */}
            <div className="flex-1 flex justify-center">
              <div className="rounded-xl border bg-card p-4 shadow w-full max-w-md">
                {feature.imageUrl ? (
                  <Image
                    src={feature.imageUrl}
                    alt={feature.title}
                    width={500}
                    height={300}
                    className="w-full h-auto rounded"
                  />
                ) : (
                  <div className="bg-muted/20 rounded-lg aspect-video flex items-center justify-center">
                    <span className="icon-f text-muted-foreground text-6xl">{feature.icon || '📱'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
