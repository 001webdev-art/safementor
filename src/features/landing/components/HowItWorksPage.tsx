'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Navigation } from '@/features/landing/components/Navigation';
import { SafeMentorFooter } from '@/features/landing/components/SafeMentorFooter';

// ─── Types ────────────────────────────────────────────────────────────────────

type AlertLevel = 'red' | 'yellow' | 'none';

interface ScenarioRow {
  scenario: string;
  alert: AlertLevel;
  example: string;
}

interface CategoryGroup {
  icon: string;
  title: string;
  color: 'red' | 'yellow' | 'blue' | 'gray' | 'pink';
  rows: ScenarioRow[];
}

// ─── Alert badge ─────────────────────────────────────────────────────────────

const AlertBadge = ({ level, t }: { level: AlertLevel; t: (k: string) => string }) => {
  if (level === 'red') return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-[#FDF0EE] text-[#C4453A] whitespace-nowrap">
      🔴 {t('legend.red')}
    </span>
  );
  if (level === 'yellow') return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-[#FBF5E6] text-[#A67B1A] whitespace-nowrap">
      🟡 {t('legend.yellow')}
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-[#F3F3EF] text-[#6B6B63] whitespace-nowrap">
      — {t('legend.none')}
    </span>
  );
};

// ─── Color config ─────────────────────────────────────────────────────────────

const colorMap = {
  red:    { bg: 'bg-[#FDF0EE]', text: 'text-[#C4453A]', border: 'border-[#C4453A]/20' },
  yellow: { bg: 'bg-[#FBF5E6]', text: 'text-[#A67B1A]', border: 'border-[#A67B1A]/20' },
  blue:   { bg: 'bg-[#E8F1F8]', text: 'text-[#1A5C8C]', border: 'border-[#1A5C8C]/20' },
  gray:   { bg: 'bg-[#F3F3EF]', text: 'text-[#6B6B63]', border: 'border-[#6B6B63]/20' },
  pink:   { bg: 'bg-[#FBEAF0]', text: 'text-[#8B2252]', border: 'border-[#8B2252]/20' },
};

// ─── Section component ────────────────────────────────────────────────────────

const DetectionSection = ({
  title,
  groups,
  t,
}: {
  title: string;
  groups: CategoryGroup[];
  t: (k: string) => string;
}) => (
  <div className="mb-14">
    <h2 className="font-serif text-2xl font-bold mb-5 text-[#4A4540]">{title}</h2>

    {/* Column headers — hidden on mobile */}
    <div className="hidden md:grid grid-cols-[1fr_168px_1fr] px-3.5 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#6B6B63]">
      <span>{t('colHeaders.scenario')}</span>
      <span>{t('colHeaders.alert')}</span>
      <span>{t('colHeaders.example')}</span>
    </div>

    <div className="space-y-4">
      {groups.map((group, gi) => {
        const c = colorMap[group.color];
        return (
          <div key={gi} className="rounded-2xl overflow-hidden border border-[#E2E1DC]">
            {/* Group header */}
            <div className={`flex items-center gap-2.5 px-4 py-3 ${c.bg} ${c.text} font-semibold text-sm`}>
              <span className="text-base">{group.icon}</span>
              {group.title}
            </div>
            {/* Rows */}
            <div className="divide-y divide-[#E2E1DC] bg-white">
              {group.rows.map((row, ri) => (
                <div
                  key={ri}
                  className="md:grid md:grid-cols-[1fr_168px_1fr] flex flex-col gap-1 px-4 py-3"
                >
                  <p className="text-sm font-medium text-[#1A1A18] md:pr-4">{row.scenario}</p>
                  <div className="flex items-start md:items-center py-1 md:py-0">
                    <AlertBadge level={row.alert} t={t} />
                  </div>
                  <p className="text-sm italic text-[#6B6B63] md:pl-2">{row.example}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// ─── Alert example box ────────────────────────────────────────────────────────

const AlertExample = ({
  level,
  title,
  what,
  context,
  affected,
  t,
}: {
  level: 'red' | 'yellow';
  title: string;
  what: string;
  context: string;
  affected: string;
  t: (k: string) => string;
}) => {
  const isRed = level === 'red';
  return (
    <div className={`rounded-2xl border-2 p-6 ${isRed ? 'border-[#C4453A]/40 bg-[#FDF0EE]/40' : 'border-[#A67B1A]/30 bg-[#FBF5E6]/40'}`}>
      <h3 className="font-semibold text-sm mb-4 text-[#4A4540]">{title}</h3>
      <div className="space-y-2.5">
        {[
          { icon: isRed ? '🔴' : '🟡', text: <strong>{t(`parentView.alertLines.${level}`)}</strong> },
          { icon: '📌', text: <><strong>{t('parentView.labels.what')}:</strong> {what}</> },
          { icon: '📝', text: <><strong>{t('parentView.labels.context')}:</strong> {context}</> },
          { icon: '👤', text: <><strong>{t('parentView.labels.affected')}:</strong> {affected}</> },
        ].map((row, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-[#4A4540]">
            <span className="flex-shrink-0 text-base mt-0.5">{row.icon}</span>
            <p className="leading-snug">{row.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  const t = useTranslations('HowItWorks');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<'overview' | 'detection'>('overview');

  // ── Detection data (translated) ───────────────────────────────────────────

  const detectionSections: { title: string; groups: CategoryGroup[] }[] = [
    {
      title: t('detection.mental.title'),
      groups: [
        {
          icon: '💔', title: t('detection.mental.suicidal.title'), color: 'red',
          rows: [
            { scenario: t('detection.mental.suicidal.r1.scenario'), alert: 'yellow', example: t('detection.mental.suicidal.r1.example') },
            { scenario: t('detection.mental.suicidal.r2.scenario'), alert: 'red',    example: t('detection.mental.suicidal.r2.example') },
            { scenario: t('detection.mental.suicidal.r3.scenario'), alert: 'red',    example: t('detection.mental.suicidal.r3.example') },
            { scenario: t('detection.mental.suicidal.r4.scenario'), alert: 'red',    example: t('detection.mental.suicidal.r4.example') },
          ],
        },
        {
          icon: '🩹', title: t('detection.mental.selfharm.title'), color: 'red',
          rows: [
            { scenario: t('detection.mental.selfharm.r1.scenario'), alert: 'yellow', example: t('detection.mental.selfharm.r1.example') },
            { scenario: t('detection.mental.selfharm.r2.scenario'), alert: 'red',    example: t('detection.mental.selfharm.r2.example') },
          ],
        },
        {
          icon: '🍽️', title: t('detection.mental.eating.title'), color: 'red',
          rows: [
            { scenario: t('detection.mental.eating.r1.scenario'), alert: 'yellow', example: t('detection.mental.eating.r1.example') },
          ],
        },
      ],
    },
    {
      title: t('detection.sexual.title'),
      groups: [
        {
          icon: '🚨', title: t('detection.sexual.grooming.title'), color: 'pink',
          rows: [
            { scenario: t('detection.sexual.grooming.r1.scenario'), alert: 'red', example: t('detection.sexual.grooming.r1.example') },
            { scenario: t('detection.sexual.grooming.r2.scenario'), alert: 'red', example: t('detection.sexual.grooming.r2.example') },
            { scenario: t('detection.sexual.grooming.r3.scenario'), alert: 'red', example: t('detection.sexual.grooming.r3.example') },
          ],
        },
      ],
    },
    {
      title: t('detection.violence.title'),
      groups: [
        {
          icon: '⚠️', title: t('detection.violence.physical.title'), color: 'yellow',
          rows: [
            { scenario: t('detection.violence.physical.r1.scenario'), alert: 'red',    example: t('detection.violence.physical.r1.example') },
            { scenario: t('detection.violence.physical.r2.scenario'), alert: 'red',    example: t('detection.violence.physical.r2.example') },
          ],
        },
        {
          icon: '💬', title: t('detection.violence.social.title'), color: 'yellow',
          rows: [
            { scenario: t('detection.violence.social.r1.scenario'), alert: 'yellow', example: t('detection.violence.social.r1.example') },
            { scenario: t('detection.violence.social.r2.scenario'), alert: 'yellow', example: t('detection.violence.social.r2.example') },
            { scenario: t('detection.violence.social.r3.scenario'), alert: 'yellow', example: t('detection.violence.social.r3.example') },
            { scenario: t('detection.violence.social.r4.scenario'), alert: 'yellow', example: t('detection.violence.social.r4.example') },
          ],
        },
      ],
    },
    {
      title: t('detection.content.title'),
      groups: [
        {
          icon: '🚫', title: t('detection.content.blocked.title'), color: 'gray',
          rows: [
            { scenario: t('detection.content.blocked.r1.scenario'), alert: 'yellow', example: t('detection.content.blocked.r1.example') },
            { scenario: t('detection.content.blocked.r2.scenario'), alert: 'yellow', example: t('detection.content.blocked.r2.example') },
            { scenario: t('detection.content.blocked.r3.scenario'), alert: 'none',   example: t('detection.content.blocked.r3.example') },
            { scenario: t('detection.content.blocked.r4.scenario'), alert: 'none',   example: t('detection.content.blocked.r4.example') },
          ],
        },
      ],
    },
    {
      title: t('detection.learning.title'),
      groups: [
        {
          icon: '📚', title: t('detection.learning.homework.title'), color: 'blue',
          rows: [
            { scenario: t('detection.learning.homework.r1.scenario'), alert: 'none', example: t('detection.learning.homework.r1.example') },
            { scenario: t('detection.learning.homework.r2.scenario'), alert: 'none', example: t('detection.learning.homework.r2.example') },
            { scenario: t('detection.learning.homework.r3.scenario'), alert: 'none', example: t('detection.learning.homework.r3.example') },
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#4A4540]" suppressHydrationWarning>
      <Navigation />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 relative overflow-hidden bg-[#FDFBF8]">
          <div className="absolute top-10 right-10 w-64 h-64 organic-blob bg-[#A8B5A0] opacity-20 -z-0" />
          <div className="absolute bottom-10 left-0 w-40 h-40 organic-blob-2 bg-[#7B8F71] opacity-10 -z-0" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="max-w-3xl">
              <p className="text-sm font-medium tracking-widest uppercase mb-4 opacity-60 animate-fade-in">
                {t('hero.eyebrow')}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in delay-1 text-[#4A4540]">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl leading-relaxed opacity-75 mb-8 animate-fade-in delay-2 text-[#4A4540]">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* ── Tab switcher ─────────────────────────────────────────────── */}
        <div className="w-full border-t border-b border-[#F5F2EC] bg-white sticky top-[64px] z-40">
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 flex gap-0">
            {(['overview', 'detection'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-[#7B8F71] text-[#4A4540]'
                    : 'border-transparent text-[#4A4540] opacity-50 hover:opacity-75'
                }`}
              >
                {t(`tabs.${tab}`)}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            TAB 1: HOW IT WORKS OVERVIEW
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <>
            {/* ── Intro callout ──────────────────────────────────────── */}
            <section className="w-full px-6 md:px-12 lg:px-20 py-16 bg-[#FDFBF8]">
              <div className="max-w-6xl mx-auto">
                <div className="border-l-4 border-[#4A4540] pl-5 py-1 rounded-r-xl bg-white gentle-shadow mb-16 max-w-3xl">
                  <p className="text-sm leading-relaxed text-[#4A4540] opacity-90">
                    {t('intro')}
                  </p>
                </div>

                {/* ── 3 Stages ─────────────────────────────────────────── */}
                <div className="text-center mb-12 animate-fade-in">
                  <p className="text-sm font-medium tracking-widest uppercase mb-3 opacity-60">{t('stages.eyebrow')}</p>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A4540]">{t('stages.title')}</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-20">
                  {([1, 2, 3] as const).map((n) => {
                    const colors = [
                      { dot: 'bg-[#7B8F71]', badge: 'bg-[#E5F0EC] text-[#1B5E4B]' },
                      { dot: 'bg-[#A67B1A]', badge: 'bg-[#FBF5E6] text-[#A67B1A]' },
                      { dot: 'bg-[#C4453A]', badge: 'bg-[#FDF0EE] text-[#C4453A]' },
                    ][n - 1];
                    return (
                      <div key={n} className={`card-hover gentle-shadow rounded-3xl p-8 animate-fade-in delay-${n} bg-[#F5F2EC]/50 flex flex-col gap-4`}>
                        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold w-fit ${colors.badge}`}>
                          <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                          {t(`stages.stage${n}.badge`)}
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#4A4540]">{t(`stages.stage${n}.title`)}</h3>
                        <p className="opacity-70 leading-relaxed text-sm text-[#4A4540]">{t(`stages.stage${n}.desc`)}</p>
                      </div>
                    );
                  })}
                </div>

                {/* ── How the pipeline works ────────────────────────────── */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                  {/* Left: process steps */}
                  <div className="gentle-shadow rounded-3xl p-8 bg-[#F5F2EC]/50">
                    <h3 className="font-serif text-xl font-bold mb-6 text-[#4A4540]">{t('pipeline.title')}</h3>
                    <div className="space-y-5">
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="flex gap-4 items-start">
                          <div className="w-7 h-7 rounded-full bg-[#7B8F71] text-[#FDFBF8] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {n}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#4A4540]">{t(`pipeline.step${n}.title`)}</p>
                            <p className="text-sm opacity-65 text-[#4A4540] leading-snug mt-0.5">{t(`pipeline.step${n}.desc`)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: what parents see */}
                  <div className="gentle-shadow rounded-3xl p-8 bg-[#F5F2EC]/50">
                    <h3 className="font-serif text-xl font-bold mb-6 text-[#4A4540]">{t('parentView.title')}</h3>
                    <div className="space-y-4">
                      <AlertExample
                        level="yellow"
                        title={t('parentView.yellow.title')}
                        what={t('parentView.yellow.what')}
                        context={t('parentView.yellow.context')}
                        affected={t('parentView.yellow.affected')}
                        t={t}
                      />
                      <AlertExample
                        level="red"
                        title={t('parentView.red.title')}
                        what={t('parentView.red.what')}
                        context={t('parentView.red.context')}
                        affected={t('parentView.red.affected')}
                        t={t}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Legend ───────────────────────────────────────────── */}
                <div className="gentle-shadow rounded-2xl p-5 bg-white border border-[#E2E1DC] mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-4">{t('legend.title')}</p>
                  <div className="flex flex-wrap gap-5">
                    {(['red', 'yellow', 'none'] as AlertLevel[]).map((level) => (
                      <div key={level} className="flex items-center gap-2 text-sm">
                        <AlertBadge level={level} t={t} />
                        <span className="opacity-65 text-xs">{t(`legend.${level}Desc`)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Privacy note */}
                <div className="rounded-2xl p-5 bg-[#E8F1F8] text-[#1A5C8C] text-sm leading-relaxed">
                  <strong className="font-semibold">{t('privacy.label')}</strong> {t('privacy.text')}
                </div>
              </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────────── */}
            <section className="w-full px-6 md:px-12 lg:px-20 py-16 bg-[#F8F6F3]">
              <div className="max-w-2xl mx-auto text-center animate-fade-in">
                <h2 className="font-serif text-3xl font-bold mb-4 text-[#4A4540]">{t('cta.title')}</h2>
                <p className="opacity-75 text-lg mb-8 text-[#4A4540]">{t('cta.subtitle')}</p>
                <div className="flex flex-wrap gap-4 justify-center mb-4">
                  <Link
                    href={`/${locale}/register`}
                    className="px-8 py-3.5 rounded-full font-medium bg-[#7B8F71] text-[#FDFBF8] hover:opacity-90 transition-all shadow-sm"
                  >
                    {t('cta.primary')}
                  </Link>
                  <button
                    onClick={() => setActiveTab('detection')}
                    className="px-8 py-3.5 rounded-full font-medium border border-[#7B8F71] text-[#7B8F71] hover:bg-[#7B8F71]/5 transition-all"
                  >
                    {t('cta.secondary')}
                  </button>
                </div>
                <div className="flex justify-center">
                  <a
                    href="https://safementor-safety.streamlit.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3.5 rounded-full font-medium border border-[#7B8F71] text-[#7B8F71] hover:bg-[#7B8F71]/5 transition-all"
                  >
                    {t('cta.tertiary')}
                  </a>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 2: DETECTION TABLE
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'detection' && (
          <section className="w-full px-6 md:px-12 lg:px-20 py-14 bg-[#FDFBF8]">
            <div className="max-w-6xl mx-auto">
              {/* intro */}
              <div className="border-l-4 border-[#4A4540] pl-5 py-1 rounded-r-xl bg-white gentle-shadow mb-10 max-w-3xl">
                <p className="text-sm leading-relaxed text-[#4A4540] opacity-90">
                  {t('detection.intro')}
                </p>
              </div>

              {/* Legend compact */}
              <div className="flex flex-wrap gap-4 mb-10">
                {(['red', 'yellow', 'none'] as AlertLevel[]).map((level) => (
                  <div key={level} className="flex items-center gap-2 text-sm">
                    <AlertBadge level={level} t={t} />
                    <span className="text-xs opacity-60 text-[#4A4540]">{t(`legend.${level}Desc`)}</span>
                  </div>
                ))}
              </div>

              {detectionSections.map((sec, i) => (
                <DetectionSection key={i} title={sec.title} groups={sec.groups} t={t} />
              ))}

              {/* Privacy note */}
              <div className="rounded-2xl p-5 bg-[#E8F1F8] text-[#1A5C8C] text-sm leading-relaxed mt-6">
                <strong className="font-semibold">{t('privacy.label')}</strong> {t('privacy.text')}
              </div>

              {/* Try it out CTA */}
              <div className="flex justify-center mt-10">
                <a
                  href="https://safementor-safety.streamlit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full font-medium border border-[#7B8F71] text-[#7B8F71] hover:bg-[#7B8F71]/5 transition-all"
                >
                  {t('cta.tertiary')}
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      <SafeMentorFooter />
    </div>
  );
}
