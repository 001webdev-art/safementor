<<<<<<< HEAD
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
=======
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
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9
