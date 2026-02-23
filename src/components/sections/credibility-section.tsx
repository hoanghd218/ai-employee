"use client";

import { useState } from "react";
import { CREDIBILITY_CONTENT } from "@/lib/constants";
import { CtaButton } from "@/components/shared/cta-button";

export function CredibilitySection() {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = CREDIBILITY_CONTENT.videoUrl.split("/embed/")[1];

  return (
    <section id="credibility" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-heading text-center text-2xl font-bold text-navy sm:text-3xl md:text-4xl mb-12">
          {CREDIBILITY_CONTENT.title}
        </h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-start">
          {/* Story + Stats */}
          <div>
            <p className="text-lg text-text-main leading-relaxed">
              {CREDIBILITY_CONTENT.story}
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {CREDIBILITY_CONTENT.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-gray-bg p-4 text-center"
                >
                  <p className="font-heading text-2xl font-extrabold text-orange">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-text-muted-custom">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Video facade / embed */}
          <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg relative">
            {showVideo ? (
              <iframe
                src={`${CREDIBILITY_CONTENT.videoUrl}?autoplay=1`}
                title={CREDIBILITY_CONTENT.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setShowVideo(true)}
                className="group relative h-full w-full cursor-pointer"
                aria-label={`Xem video: ${CREDIBILITY_CONTENT.videoTitle}`}
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt={CREDIBILITY_CONTENT.videoTitle}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white ml-1" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <CtaButton text={CREDIBILITY_CONTENT.ctaText} />
        </div>
      </div>
    </section>
  );
}
