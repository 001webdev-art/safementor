import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Navigation } from '@/features/landing/components/Navigation';
import { SafeMentorFooter } from '@/features/landing/components/SafeMentorFooter';

// ─── Small inline icons ──────────────────────────────────────────────────────

const GiftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const HandshakeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 17l-1.5-1.5a3.5 3.5 0 0 0-5 0L3 17" /><path d="M13 17l1.5-1.5a3.5 3.5 0 0 1 5 0L21 17" />
    <path d="M8 12l3-3 2 2 5-5" /><path d="M2 12l4 4M22 12l-4 4" />
  </svg>
);

// ─── Step item ────────────────────────────────────────────────────────────────

const Step = ({ num, title, desc, isLast }: { num: number; title: string; desc: string; isLast?: boolean }) => (
  <div className="flex items-start gap-4">
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="w-9 h-9 rounded-full flex items-center justify-center font-serif font-bold text-sm bg-[#7B8F71] text-[#FDFBF8]">
        {num}
      </div>
      {!isLast && <div className="w-px flex-1 bg-[#E8E4DC] mt-2 mb-2 min-h-[2rem]" />}
    </div>
    <div className="pb-8">
      <p className="font-semibold text-[#4A4540] mb-1">{title}</p>
      <p className="text-sm opacity-70 leading-relaxed text-[#4A4540]">{desc}</p>
    </div>
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PilotProgramPage() {
  const t = useTranslations('PilotProgram');
  const locale = useLocale();

  const benefits = [
    { id: 'item1', icon: <GiftIcon /> },
    { id: 'item2', icon: <PhoneIcon /> },
    { id: 'item3', icon: <HandshakeIcon /> },
  ];

  const steps = t.raw('process.steps') as { title: string; desc: string }[];
  const mailSubject = encodeURIComponent(t('cta.mailSubject'));

  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#4A4540]" suppressHydrationWarning>
      <Navigation />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 relative overflow-hidden bg-[#FDFBF8]">
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

        {/* ── Intro paragraph ──────────────────────────────────────────── */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 bg-[#FDFBF8]">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <p className="text-lg opacity-80 leading-relaxed text-[#4A4540]">
              {t('mission.intro')}
            </p>
          </div>
        </section>

        {/* ── Benefits ─────────────────────────────────────────────────── */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 bg-[#F8F6F3]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <p className="text-sm font-medium tracking-widest uppercase opacity-60 mb-3">
                {t('benefits.eyebrow')}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A4540]">
                {t('benefits.title')}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((b) => (
                <div key={b.id} className="gentle-shadow card-hover rounded-2xl p-8 bg-[#FDFBF8] flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7B8F71]/15 flex items-center justify-center text-[#7B8F71]">
                    {b.icon}
                  </div>
                  <h4 className="font-semibold text-[#4A4540]">{t(`benefits.${b.id}.title`)}</h4>
                  <p className="text-sm opacity-70 leading-relaxed text-[#4A4540]">{t(`benefits.${b.id}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────────────── */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-[#FDFBF8]">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <p className="text-sm font-medium tracking-widest uppercase opacity-60 mb-3">
                {t('process.eyebrow')}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A4540]">
                {t('process.title')}
              </h2>
            </div>
            <div className="animate-fade-in delay-1">
              {steps.map((s, i) => (
                <Step key={s.title} num={i + 1} title={s.title} desc={s.desc} isLast={i === steps.length - 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 bg-[#F8F6F3]">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-[#4A4540]">
              {t('cta.title')}
            </h2>
            <p className="opacity-75 text-lg mb-8 leading-relaxed text-[#4A4540]">
              {t('cta.subtitle')}
            </p>
            <a
              href={`mailto:safementor-pilot@mail.com?subject=${mailSubject}`}
              className="inline-block px-8 py-3.5 rounded-full font-medium bg-[#7B8F71] text-[#FDFBF8] hover:opacity-90 transition-all shadow-sm hover:shadow-md"
            >
              {t('cta.button')}
            </a>
          </div>
        </section>
      </main>

      <SafeMentorFooter />
    </div>
  );
}
