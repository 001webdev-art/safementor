// Dashboard feature public API
// Export specific components and utilities used across the app

// Components from features/dashboard/components
export { Overview } from './components/Overview'
export { Notifications } from './components/Notifications'
export { PersonalData } from './components/PersonalData'
export { ChildrenData } from './components/ChildrenData'
export { Privacy } from './components/Privacy'
export { HelpSupport } from './components/HelpSupport'
export { default as DashboardClient } from './components/DashboardClient'

// Forms from features/dashboard/forms
export { default as PersonalInfoForm } from './forms/PersonalInfoForm'
export { default as AddressForm } from './forms/AddressForm'
export { default as BillingForm } from './forms/BillingForm'
export { default as BillingInformationForm } from './forms/BillingInformationForm'
export { default as ChildForm } from './forms/ChildForm'
export { default as CommunicationForm } from './forms/CommunicationForm'
export { default as ContactInfoForm } from './forms/ContactInfoForm'
export { default as PaymentDataForm } from './forms/PaymentDataForm'
export { default as PreferencesForm } from './forms/PreferencesForm'

// Sections from features/dashboard/sections
export { default as OverviewSection } from './sections/OverviewSection'
export { default as ChildrenSection } from './sections/ChildrenSection'
export { default as HelpSection } from './sections/HelpSection'
export { default as PrivacySection } from './sections/PrivacySection'

// UI Components
export { default as CollapsibleCard } from './components/ui/CollapsibleCard'
export { default as LoadingState } from './components/ui/LoadingState'
export { default as SaveButton } from './components/ui/SaveButton'

// Hooks
export { useProfile } from './hooks/useProfile'
export { useChildren } from './hooks/useChildren'
export { useCollapsibleGroups } from './hooks/useCollapsibleGroups'
export { useDashboardSections } from './hooks/useDashboardSections'
