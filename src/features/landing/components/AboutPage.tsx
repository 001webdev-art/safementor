'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Navigation } from '@/features/landing/components/Navigation';
import { SafeMentorFooter } from '@/features/landing/components/SafeMentorFooter';

// ─── Small inline icons ──────────────────────────────────────────────────────

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

const SmileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M8 13s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const LeafIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const WrenchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ─── Avatar placeholder (initials) ───────────────────────────────────────────

const Avatar = ({ initials, bg }: { initials: string; bg: string }) => (
  <div
    className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-serif font-bold text-[#FDFBF8]"
    style={{ background: bg }}
  >
    {initials}
  </div>
);

// ─── Trait badge ─────────────────────────────────────────────────────────────

const Trait = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#F5F2EC] text-[#7B8F71] border border-[#E8E4DC]">
    <span className="text-[#7B8F71]">{icon}</span>
    {label}
  </span>
);

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const t = useTranslations('About');
  const locale = useLocale();

  const andreasTraits = [
    { icon: <WrenchIcon />, label: t('andreas.trait1') },
    { icon: <HeartIcon />, label: t('andreas.trait2') },
    { icon: <LeafIcon />,  label: t('andreas.trait3') },
  ];

  const heinrichTraits = [
    { icon: <CodeIcon />,  label: t('heinrich.trait1') },
    { icon: <SmileIcon />, label: t('heinrich.trait2') },
    { icon: <StarIcon />,  label: t('heinrich.trait3') },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#4A4540]" suppressHydrationWarning>
      <Navigation />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 relative overflow-hidden bg-[#FDFBF8]">
          {/* Decorative blobs */}
          <div className="absolute top-10 right-10 w-64 h-64 organic-blob bg-[#A8B5A0] opacity-20 -z-0" />
          <div className="absolute bottom-10 left-0 w-48 h-48 organic-blob-2 bg-[#7B8F71] opacity-10 -z-0" />

          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <p className="text-sm font-medium tracking-widest uppercase mb-4 opacity-60 animate-fade-in">
              {t('hero.eyebrow')}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in delay-1">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl leading-relaxed opacity-75 max-w-2xl mx-auto animate-fade-in delay-2">
              {t('hero.subtitle')}
            </p>
          </div>
        </section>

        {/* ── Mission stripe ───────────────────────────────────────────── */}
        <section className="w-full border-t border-b border-[#F5F2EC] bg-[#F8F6F3] px-6 md:px-12 lg:px-20 py-14">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-serif font-semibold leading-relaxed text-[#4A4540] opacity-90">
              &ldquo;{t('mission.quote')}&rdquo;
            </p>
          </div>
        </section>

        {/* ── Andreas ──────────────────────────────────────────────────── */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-[#FDFBF8]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">

              {/* Left: visual identity */}
              <div className="animate-fade-in">
                <div className="gentle-shadow rounded-3xl p-10 bg-[#F5F2EC]/50 flex flex-col items-center text-center gap-6">
                  <Avatar initials="AG" bg="linear-gradient(135deg, #7B8F71 0%, #A8B5A0 100%)" />
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#4A4540] mb-1">
                      {t('andreas.name')}
                    </h2>
                    <p className="text-sm opacity-60 uppercase tracking-widest font-medium">
                      {t('andreas.role')}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {andreasTraits.map((tr) => (
                      <Trait key={tr.label} icon={tr.icon} label={tr.label} />
                    ))}
                  </div>
                  {/* Timeline strip */}
                  <div className="w-full pt-4 border-t border-[#E8E4DC] space-y-3 text-left">
                    {(t.raw('andreas.timeline') as string[]).map((item: string) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7B8F71] flex-shrink-0 mt-2" />
                        <p className="text-sm opacity-70 leading-snug">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: story */}
              <div className="animate-fade-in delay-2 space-y-6">
                <p className="text-sm font-medium tracking-widest uppercase opacity-60">
                  {t('andreas.eyebrow')}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#4A4540] leading-tight">
                  {t('andreas.headline')}
                </h3>
                <div className="space-y-4 opacity-80 leading-relaxed text-[#4A4540]">
                  {(t.raw('andreas.paragraphs') as string[]).map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Quote block */}
                <blockquote className="border-l-2 border-[#7B8F71] pl-5 py-2">
                  <p className="italic opacity-80 leading-relaxed text-[#4A4540]">
                    &ldquo;{t('andreas.quote')}&rdquo;
                  </p>
                  <cite className="text-xs opacity-50 not-italic mt-2 block">
                    — {t('andreas.quoteSource')}
                  </cite>
                </blockquote>

                <p className="opacity-80 leading-relaxed font-medium text-[#4A4540]">
                  {t('andreas.closing')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Divider ──────────────────────────────────────────────────── */}
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto border-t border-[#F5F2EC]" />
        </div>

        {/* ── Heinrich ─────────────────────────────────────────────────── */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-[#FDFBF8]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">

              {/* Left: story (reversed order on desktop) */}
              <div className="order-2 md:order-1 animate-fade-in delay-2 space-y-6">
                <p className="text-sm font-medium tracking-widest uppercase opacity-60">
                  {t('heinrich.eyebrow')}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#4A4540] leading-tight">
                  {t('heinrich.headline')}
                </h3>
                <div className="space-y-4 opacity-80 leading-relaxed text-[#4A4540]">
                  {(t.raw('heinrich.paragraphs') as string[]).map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <p className="opacity-80 leading-relaxed font-medium text-[#4A4540]">
                  {t('heinrich.closing')}
                </p>
              </div>

              {/* Right: visual identity */}
              <div className="order-1 md:order-2 animate-fade-in">
                <div className="gentle-shadow rounded-3xl p-10 bg-[#F5F2EC]/50 flex flex-col items-center text-center gap-6">
                  <Avatar initials="HG" bg="linear-gradient(135deg, #8B7355 0%, #A8956E 100%)" />
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#4A4540] mb-1">
                      {t('heinrich.name')}
                    </h2>
                    <p className="text-sm opacity-60 uppercase tracking-widest font-medium">
                      {t('heinrich.role')}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {heinrichTraits.map((tr) => (
                      <Trait key={tr.label} icon={tr.icon} label={tr.label} />
                    ))}
                  </div>
                  {/* Timeline strip */}
                  <div className="w-full pt-4 border-t border-[#E8E4DC] space-y-3 text-left">
                    {(t.raw('heinrich.timeline') as string[]).map((item: string) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B7355] flex-shrink-0 mt-2" />
                        <p className="text-sm opacity-70 leading-snug">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Shared values strip ──────────────────────────────────────── */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 bg-[#F8F6F3]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <p className="text-sm font-medium tracking-widest uppercase opacity-60 mb-3">
                {t('shared.eyebrow')}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A4540]">
                {t('shared.title')}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { id: 'value1', icon: <HeartIcon /> },
                { id: 'value2', icon: <LeafIcon /> },
                { id: 'value3', icon: <StarIcon /> }
              ].map((value) => (
                <div
                  key={value.id}
                  className="gentle-shadow card-hover rounded-2xl p-8 bg-[#FDFBF8] flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7B8F71]/15 flex items-center justify-center text-[#7B8F71]">
                    {value.icon}
                  </div>
                  <h4 className="font-semibold text-[#4A4540]">
                    {t(`shared.${value.id}.title`)}
                  </h4>
                  <p className="text-sm opacity-70 leading-relaxed text-[#4A4540]">
                    {t(`shared.${value.id}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 bg-[#FDFBF8]">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-[#4A4540]">
              {t('cta.title')}
            </h2>
            <p className="opacity-75 text-lg mb-8 leading-relaxed text-[#4A4540]">
              {t('cta.subtitle')}
            </p>
            <Link
              href={`/${locale}/register`}
              className="inline-block px-8 py-3.5 rounded-full font-medium bg-[#7B8F71] text-[#FDFBF8] hover:opacity-90 transition-all shadow-sm hover:shadow-md"
            >
              {t('cta.button')}
            </Link>
          </div>
        </section>
      </main>

      <SafeMentorFooter />
    </div>
  );
}
