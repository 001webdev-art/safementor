# Project Structure: SafeMentor

SafeMentor is an AI-powered platform focused on child safety and emotional support. This document outlines the project's organization and the purpose of its main directories and modules.

## 🏗️ Architecture Overview

The project is built with **Next.js** (App Router), **TypeScript**, **Supabase**, and **Tailwind CSS**. It uses `next-intl` for comprehensive internationalization (i18n).

---

## 📁 Directory Breakdown

### `/app`

The primary entry point of the application using the Next.js App Router.

- **`/[locale]`**: Root for localized routes.
  - `/auth`: Authentication-related pages.
  - `/chat`: The main AI mentor chat interface.
  - `/dashboard` & `/dashboard2`: User management and monitoring interfaces.
  - `/login` & `/register`: User onboarding flows.
- **`/api`**: Server-side API routes for backend logic.

### `/components`

Reusable UI components organized by feature or page.

- **`/landing`**: Components exclusively for the homepage/landing page (Hero, TrustBadges, Navigation, etc.).
- **`/dashboard2`**: Modernized dashboard UI components (Overview, ChildrenData, Notifications).
- **`Providers.tsx`**: React context providers (Auth, Query, etc.).

### `/lib`

Core utility libraries and shared logic.

- **`/llm`**: Contains `llmService.ts`, which manages interactions with AI models.
- **`/supabase`**: Initialization of the Supabase client for both client-side and server-side operations.

### `/src`

Contains supplemental application logic or specific sub-applications.

- **`/app`**: A standalone application structure with dedicated screens like `ChatScreen`, `WelcomeScreen`, and `HelpScreen`. This may serve as a specialized interface or represent an internal tool.

### `/i18n` & `/messages`

- **`/i18n`**: Configuration for internationalization, including locale detection and routing.
- **`/messages`**: JSON files containing translations for all supported languages.

### `/sql`

Contains SQL scripts for defining the database schema, functions, and initial data setup in Supabase.

### `/public`

Static assets, including icons, images, and the Service Worker (`sw-chat.js`) for PWA (Progressive Web App) support.

### `/types`

Global TypeScript type definitions and interfaces used across the project to ensure type safety.

---

## 🛠️ Key Configuration Files

| File                 | Purpose                                                               |
| -------------------- | --------------------------------------------------------------------- |
| `next.config.js`     | Main Next.js configuration, integrating PWA and `next-intl`.          |
| `middleware.ts`      | Handles routing, localization redirects, and potentially auth guards. |
| `tailwind.config.ts` | Customizes the styling framework (colors, spacing, fonts).            |
| `package.json`       | Project metadata, scripts, and dependency management.                 |
| `tsconfig.json`      | TypeScript compiler configuration.                                    |

---

## 🚀 Key Modules

1. **AI Chat Engine**: Integrated via `lib/llm`, providing context-aware emotional support to children.
2. **Internationalization**: Full RTL/LTR support through `next-intl`.
3. **Database & Auth**: Powered by Supabase for real-time data and secure user management.
4. **Offline Support**: PWA integration for a native-like experience on mobile devices.
