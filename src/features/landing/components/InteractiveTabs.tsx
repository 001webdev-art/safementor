'use client';

import React, { useState } from 'react';

interface InteractiveTabsProps {
  overviewTab: React.ReactNode;
  detectionTab: React.ReactNode;
  overviewLabel: string;
  detectionLabel: string;
}

export function InteractiveTabs({
  overviewTab,
  detectionTab,
  overviewLabel,
  detectionLabel,
}: InteractiveTabsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'detection'>('overview');

  const handleWrapperClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // If the click is on or inside the button to view detection table
    if (target.closest('#view-detection-table-btn')) {
      e.preventDefault();
      setActiveTab('detection');
      
      // Scroll smoothly to the tab header
      const headerElement = document.getElementById('tab-switcher-header');
      if (headerElement) {
        headerElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div onClick={handleWrapperClick}>
      {/* ── Tab switcher ─────────────────────────────────────────────── */}
      <div id="tab-switcher-header" className="w-full border-t border-b border-[#F5F2EC] bg-white sticky top-[64px] z-40">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 flex gap-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#7B8F71] text-[#4A4540]'
                : 'border-transparent text-[#4A4540] opacity-50 hover:opacity-75'
            }`}
          >
            {overviewLabel}
          </button>
          <button
            onClick={() => setActiveTab('detection')}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-all ${
              activeTab === 'detection'
                ? 'border-[#7B8F71] text-[#4A4540]'
                : 'border-transparent text-[#4A4540] opacity-50 hover:opacity-75'
            }`}
          >
            {detectionLabel}
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? overviewTab : detectionTab}
    </div>
  );
}
