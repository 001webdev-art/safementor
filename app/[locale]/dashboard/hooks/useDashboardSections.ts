'use client';

import { useState } from 'react';
import { Section } from '@/types/dashboard';

export function useDashboardSections() {
    const [activeSection, setActiveSection] = useState<Section>('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return {
        activeSection,
        setActiveSection,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu
    };
}
