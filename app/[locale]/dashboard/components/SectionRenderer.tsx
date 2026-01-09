<<<<<<< HEAD
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import LoadingState from './ui/LoadingState';
import { Section, SectionProps, ChildrenSectionProps } from '@/types/dashboard';

// Lazy load sections for better performance
const OverviewSection = dynamic(() => import('../sections/OverviewSection'), {
    loading: () => <LoadingState message="Loading Overview..." />
});
const ChildrenSection = dynamic(() => import('../sections/ChildrenSection'), {
    loading: () => <LoadingState message="Loading Children..." />
});
const PrivacySection = dynamic(() => import('../sections/PrivacySection'), {
    loading: () => <LoadingState message="Loading Privacy..." />
});
const HelpSection = dynamic(() => import('../sections/HelpSection'), {
    loading: () => <LoadingState message="Loading Help..." />
});

interface SectionRendererProps extends SectionProps, Omit<ChildrenSectionProps, 't'> {
    activeSection: Section;
}

/**
 * SectionRenderer Component
 * Orchestrates conditional rendering of dashboard sections.
 */
export default function SectionRenderer({
    activeSection,
    ...props
}: SectionRendererProps) {

    switch (activeSection) {
        case 'overview':
            return <OverviewSection {...props} />;
        case 'children':
            return <ChildrenSection {...props} />;
        case 'privacy':
            return <PrivacySection {...props} />;
        case 'help':
            return <HelpSection {...props} />;
        default:
            return null;
    }
}
=======
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import LoadingState from './ui/LoadingState';
import { Section, SectionProps, ChildrenSectionProps } from '@/types/dashboard';

// Lazy load sections for better performance
const OverviewSection = dynamic(() => import('../sections/OverviewSection'), {
    loading: () => <LoadingState message="Loading Overview..." />
});
const ChildrenSection = dynamic(() => import('../sections/ChildrenSection'), {
    loading: () => <LoadingState message="Loading Children..." />
});
const PrivacySection = dynamic(() => import('../sections/PrivacySection'), {
    loading: () => <LoadingState message="Loading Privacy..." />
});
const HelpSection = dynamic(() => import('../sections/HelpSection'), {
    loading: () => <LoadingState message="Loading Help..." />
});

interface SectionRendererProps extends SectionProps, Omit<ChildrenSectionProps, 't'> {
    activeSection: Section;
}

/**
 * SectionRenderer Component
 * Orchestrates conditional rendering of dashboard sections.
 */
export default function SectionRenderer({
    activeSection,
    ...props
}: SectionRendererProps) {

    switch (activeSection) {
        case 'overview':
            return <OverviewSection {...props} />;
        case 'children':
            return <ChildrenSection {...props} />;
        case 'privacy':
            return <PrivacySection {...props} />;
        case 'help':
            return <HelpSection {...props} />;
        default:
            return null;
    }
}
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9
