# Next.js Project Refactoring Plan

## Executive Summary
This refactoring consolidates a fragmented Next.js project into a **professional, feature-first architecture** following modern software engineering best practices. The new structure will:

- ✅ Use `src/` as the single source of truth
- ✅ Organize by **features** (business domains) rather than file types
- ✅ Separate concerns: routing, business logic, UI components, services
- ✅ Improve scalability and maintainability
- ✅ Reduce circular dependencies and naming conflicts

---

## Current State Analysis

### Problems Identified
1. **Scattered root-level folders**: `app/`, `components/`, `types/`, `lib/`, etc. at root
2. **Duplication**: Duplicate `src/app/`, `src/components/`, `src/lib/`
3. **Fragmented components**: `components/` + `components_parents/` + scattered dashboard2/
4. **No feature organization**: No clear domain/feature separation
5. **Global scope pollution**: All components treated as global
6. **Import complexity**: Mix of relative and absolute imports with varying paths

### Current Structure Overview
```
next1_intl_proto/
├── app/                           ← Root level app (conflicting)
├── components/                    ← Root level components
├── components_parents/            ← Separate parent components
├── src/                           ← Also has app/, components/, lib/
├── types/                         ← Root level types
├── lib/                           ← Root level lib
├── middleware.ts                  ← Root level middleware
├── messages/                      ← i18n files
├── public/
├── sql/
└── [other config files]
```

---

## Target Architecture

### Professional Feature-First Structure
```
next1_intl_proto/
│
├── src/                          # All source code lives here
│   │
│   ├── app/                      # Next.js App Router (ROUTES ONLY)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── [locale]/
│   │   │   ├── layout.tsx       # Internationalized layout
│   │   │   ├── page.tsx         # Landing page
│   │   │   ├── not-found.tsx
│   │   │   ├── (auth)/          # Route group for auth pages
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── access/
│   │   │   ├── (dashboard)/     # Route group for protected pages
│   │   │   │   ├── chat/
│   │   │   │   ├── chat-history/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── profile/     # New: consolidated parent area
│   │   │   │   └── settings/
│   │   │   ├── (legal)/         # Route group for legal pages
│   │   │   │   ├── privacy/
│   │   │   │   ├── terms/
│   │   │   │   ├── imprint/
│   │   │   │   └── subprocessors/
│   │   │   └── [...rest]/
│   │   └── api/                 # API Routes
│   │       ├── access/
│   │       ├── auth/
│   │       └── chat/
│   │
│   ├── features/                # Business logic by domain
│   │   │
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   ├── AccessLegalModal.tsx
│   │   │   │   └── LoginLegalModal.tsx
│   │   │   ├── contexts/
│   │   │   │   └── AuthContext.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   ├── types/
│   │   │   │   └── auth.ts
│   │   │   └── index.ts         # Public API: export from here only
│   │   │
│   │   ├── chat/
│   │   │   ├── components/
│   │   │   │   ├── ChatScreen.tsx
│   │   │   │   ├── ChatHeader.tsx
│   │   │   │   ├── ChatFooter.tsx
│   │   │   │   ├── MessageBubble.tsx
│   │   │   │   ├── MessageList.tsx
│   │   │   │   ├── MessageInput.tsx
│   │   │   │   ├── SafetyBanner.tsx
│   │   │   │   ├── ChatEmojiPicker.tsx
│   │   │   │   └── ChildSelector.tsx
│   │   │   ├── contexts/
│   │   │   │   └── ChatContext.tsx
│   │   │   │   └── ChildContext.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useChat.ts
│   │   │   │   ├── usePWA.ts
│   │   │   │   └── useMessages.ts
│   │   │   ├── services/
│   │   │   │   ├── mentorService.ts
│   │   │   │   ├── pouchdbService.ts
│   │   │   │   └── syncService.ts
│   │   │   ├── store/
│   │   │   │   └── chatStore.ts (Zustand)
│   │   │   ├── types/
│   │   │   │   ├── chat.ts
│   │   │   │   └── mentor.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── chat-history/
│   │   │   ├── components/
│   │   │   │   ├── HistoryGrid.tsx
│   │   │   │   ├── HistoryList.tsx
│   │   │   │   └── HistoryFilter.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useHistory.ts
│   │   │   ├── types/
│   │   │   │   └── history.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   ├── DashboardSidebar.tsx
│   │   │   │   ├── DashboardHeader.tsx
│   │   │   │   └── SectionRenderer.tsx
│   │   │   ├── sections/
│   │   │   │   ├── OverviewSection.tsx
│   │   │   │   ├── ChildrenSection.tsx
│   │   │   │   ├── HelpSection.tsx
│   │   │   │   └── PrivacySection.tsx
│   │   │   ├── forms/
│   │   │   │   ├── PersonalInfoForm.tsx
│   │   │   │   ├── AddressForm.tsx
│   │   │   │   ├── BillingForm.tsx
│   │   │   │   ├── ChildForm.tsx
│   │   │   │   ├── CommunicationForm.tsx
│   │   │   │   ├── ContactInfoForm.tsx
│   │   │   │   └── PreferencesForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useDashboard.ts
│   │   │   │   ├── useChildren.ts
│   │   │   │   ├── useCollapsibleGroups.ts
│   │   │   │   └── useProfile.ts
│   │   │   ├── stores/
│   │   │   │   └── dashboardStore.ts
│   │   │   ├── types/
│   │   │   │   └── dashboard.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── profile/              # NEW: Consolidated user profile (parents & children view)
│   │   │   ├── components/
│   │   │   │   ├── ParentAccountOverview.tsx
│   │   │   │   ├── ParentChildConnection.tsx
│   │   │   │   ├── ChildQRPairing.tsx
│   │   │   │   ├── ChildSafetyNotice.tsx
│   │   │   │   └── ParentEmotionOverview.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useProfile.ts
│   │   │   ├── types/
│   │   │   │   └── profile.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── compliance/           # NEW: Separate compliance/registration feature
│   │   │   ├── components/
│   │   │   │   ├── ComplianceFrame.tsx
│   │   │   │   ├── ConsentToggles.tsx
│   │   │   │   ├── DataUsageSection.tsx
│   │   │   │   ├── PrivacySidebar.tsx
│   │   │   │   └── TransparencyReport.tsx
│   │   │   ├── types/
│   │   │   │   └── compliance.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── landing/
│   │   │   ├── components/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── SafeMentorHero.tsx
│   │   │   │   ├── Features.tsx
│   │   │   │   ├── ApproachSection.tsx
│   │   │   │   ├── CTASection.tsx
│   │   │   │   ├── FamiliesSection.tsx
│   │   │   │   ├── TestimonialSection.tsx
│   │   │   │   ├── ValuesSection.tsx
│   │   │   │   ├── TrustBadges.tsx
│   │   │   │   ├── Navigation.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── SafeMentorFooter.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts              # Public API for features
│   │
│   ├── components/               # Shared UI components (global)
│   │   ├── ui/                   # shadcn/ui & base components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── ... (other UI components)
│   │   │   └── utils.ts
│   │   │
│   │   ├── layout/               # Global layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Providers.tsx
│   │   │
│   │   ├── shared/               # Reusable across features
│   │   │   ├── ImageWithFallback.tsx
│   │   │   ├── NavigationFlow.tsx
│   │   │   ├── SafetyAlert.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   │
│   │   └── index.ts              # Public API
│   │
│   ├── lib/                      # Utilities, configs, services
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── i18n/
│   │   │   └── config.ts
│   │   │
│   │   ├── llm/
│   │   │   └── llmService.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── formatting.ts
│   │   │   ├── validation.ts
│   │   │   ├── errors.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── constants/
│   │   │   └── index.ts
│   │   │
│   │   └── hooks/
│   │       ├── usePersistentState.ts
│   │       └── useLocalStorage.ts
│   │
│   └── types/                    # Global type definitions
│       ├── database.ts
│       ├── api.ts
│       ├── common.ts
│       └── index.ts
│
├── messages/                      # i18n translation files
│   ├── en.json
│   ├── de.json
│   ├── es.json
│   └── pt.json
│
├── public/                        # Static assets
│   ├── images/
│   │   ├── criancas2.jpg
│   │   ├── criancas3.jpg
│   │   └── svg/
│   ├── icons/
│   │   ├── favicon.ico
│   │   ├── icon-192x192.png
│   │   └── icon-512x512.png
│   ├── manifest.json
│   ├── sw-chat.js
│   └── workbox-*.js
│
├── sql/                           # Database documentation
│   ├── schema/
│   │   ├── 01_children.sql
│   │   ├── 02_chat.sql
│   │   └── 03_dashboard.sql
│   └── migrations/
│
├── middleware.ts                  # Global Next.js middleware
│
├── tsconfig.json                  # TypeScript config (with path aliases)
├── next.config.js                 # Next.js config
├── tailwind.config.ts
├── postcss.config.js
├── package.json
└── README.md
```

---

## Migration Strategy

### Phase 1: Preparation (0 Risk)
- [ ] Create backup of project
- [ ] Update `tsconfig.json` with proper path aliases
- [ ] Install any missing dependencies

### Phase 2: Core Structure Setup
1. **Clean `src/` folder**: Consolidate and organize
   - Remove old `src/app/`, `src/components/`, `src/lib/` structure
   - Build new feature-based structure

2. **Create feature folders** in `src/features/`:
   - `src/features/auth/`
   - `src/features/chat/`
   - `src/features/chat-history/`
   - `src/features/dashboard/`
   - `src/features/profile/` (merge components_parents here)
   - `src/features/compliance/`
   - `src/features/landing/`

3. **Move App Router** to `src/app/`:
   - Move from `app/[locale]/` → `src/app/[locale]/`
   - Update route groups with parentheses: `(auth)/`, `(dashboard)/`, `(legal)/`
   - Keep API routes in `src/app/api/`

### Phase 3: Component Migration

#### Step 1: Features
```
components_parents/* → src/features/profile/components/
components/auth/* → src/features/auth/components/
components/dashboard2/* → src/features/dashboard/components/
components/landing/* → src/features/landing/components/
```

#### Step 2: Global Components
```
components/ui/* → src/components/ui/
components/shared/* → src/components/shared/
Merge Providers.tsx, Header.tsx → src/components/layout/
```

### Phase 4: Type Consolidation
```
types/dashboard.ts → src/types/database.ts (merge all)
types/database.ts → src/types/database.ts
types/dashboard2.ts → src/types/database.ts (as table defs)
```

### Phase 5: Update Dependencies

#### TypeScript Path Aliases
Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/app/*": ["./src/app/*"]
    }
  }
}
```

#### Next.js Config
Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  rootDir: './src',  // Explicitly use src as root
  // ... other config
}
```

#### Import Refactoring Map

| Old Import | New Import | Reason |
|-----------|-----------|--------|
| `from '../components/auth/LoginForm'` | `from '@/features/auth/components/LoginForm'` | Feature-based organization |
| `from '../../components_parents/ParentAccountOverview'` | `from '@/features/profile/components/ParentAccountOverview'` | Consolidated under features |
| `from '../../types/dashboard'` | `from '@/types/database'` | Centralized global types |
| `from '../lib/supabase/client'` | `from '@/lib/supabase'` | Using index exports |
| `from '../utils/hooks/useAuth'` | `from '@/features/auth/hooks/useAuth'` | Feature scope |

---

## File Movement Checklist

### Root Level Cleanup
- [ ] Remove duplicate `src/` folder contents (old structure)
- [ ] Delete `components/` folder (content moved to `src/`)
- [ ] Delete `components_parents/` folder (content moved to `src/features/profile/`)
- [ ] Delete `types/` folder (content moved to `src/types/`)
- [ ] Move `middleware.ts` → `src/middleware.ts`? (Check Next.js location preference)
- [ ] Consolidate root-level config files (keep at root, but reference `src/`)

### src/app/ Structure
```
Current: app/[locale]/...
Target:  src/app/[locale]/...

With route groups:
src/app/[locale]/(auth)/login → /en/login
src/app/[locale]/(auth)/register → /en/register
src/app/[locale]/(dashboard)/chat → /en/chat
src/app/[locale]/(dashboard)/dashboard → /en/dashboard
src/app/[locale]/(legal)/privacy → /en/privacy
```

### Specific File Movements

#### Auth Feature
```
NEW LOCATION: src/features/auth/

FROM:
- components/auth/LoginForm.tsx
- components/auth/RegisterForm.tsx
- components/auth/AccessLegalModal.tsx
- components/auth/LoginLegalModal.tsx
```

#### Chat Feature
```
NEW LOCATION: src/features/chat/

Will require:
- Create contexts/ChatContext.tsx (if not exists)
- Create services/mentorService.ts (from lib/llm)
- Create store/chatStore.ts (Zustand)
- Move components/*Chat*.tsx
```

#### Dashboard Feature
```
NEW LOCATION: src/features/dashboard/

FROM:
- components/dashboard2/* → components/
- types/dashboard2.ts → types/
```

#### Profile Feature (NEW)
```
NEW LOCATION: src/features/profile/

CONSOLIDATE FROM:
- components_parents/* (ALL FILES)
- Merge with dashboard user sections
```

---

## Dependency Relink Guide

### 1. Service/Utility Imports
```typescript
// OLD
import { mentorClient } from '../../lib/llm/mentor-client'

// NEW - More organized
import { useMentorChat } from '@/features/chat/hooks/useChat'
// OR
import { mentorService } from '@/features/chat/services/mentorService'
```

### 2. Component Imports
```typescript
// OLD
import { ParentAccountOverview } from '../../../components_parents/ParentAccountOverview'

// NEW
import { ParentAccountOverview } from '@/features/profile/components'
```

### 3. Type Imports
```typescript
// OLD
import type { Dashboard } from '../../../types/dashboard'

// NEW
import type { Dashboard } from '@/types/database'
```

### 4. Complex Example: Chat Feature
```typescript
// OLD: pages/chat/page.tsx
import { ChatScreen } from '../../../components/chat/ChatScreen'
import { useChat } from '../../../hooks/useChat'
import type { ChatMessage } from '../../../types/chat'

// NEW: src/app/[locale]/(dashboard)/chat/page.tsx
import { ChatScreen } from '@/features/chat/components'
import { useChat } from '@/features/chat/hooks'
import type { ChatMessage } from '@/features/chat/types'
```

---

## Implementation Considerations

### Index.ts Pattern (Barrel Exports)
Every feature should have `index.ts` to define public API:

```typescript
// src/features/chat/index.ts
export * from './components'
export * from './hooks'
export * from './types'
export * from './services'
export * from './store'

// Specific re-exports
export { default as ChatScreen } from './components/ChatScreen'
export { useChat } from './hooks/useChat'
```

### Conflict Resolution
1. **Duplicate components**: 
   - If `ParentDashboardUI` and dashboard components overlap → merge into one feature-scoped version
   
2. **Shared logic**:
   - If multiple features use same utility → move to `src/lib/utils/`
   
3. **Context duplication**:
   - Consolidate contexts; use feature index exports

### Environment Variables
- Keep `.env.local` at root
- Reference from services in `src/lib/`

---

## Testing Strategy

### Phase 1: Build Test
```bash
npm run build
```
Check for:
- ❌ Missing imports
- ❌ Type errors
- ❌ Path resolution issues

### Phase 2: Development Test
```bash
npm run dev
```
Navigate and test:
- ❌ Chat feature
- ❌ Dashboard pages
- ❌ Authentication flow
- ❌ Locale switching

### Phase 3: Dependency Check
```bash
# Find remaining old import patterns
grep -r "components/" src/ --include="*.ts" --include="*.tsx" | grep -v node_modules
grep -r "components_parents" src/ --include="*.ts" --include="*.tsx"
grep -r "types/" src/ --include="*.ts" --include="*.tsx" | grep -v "@/types"
```

---

## Execution Order

```
1. ✅ Create backup
2. ✅ Update tsconfig.json with path aliases
3. ✅ Create src/features/ directory structure
4. ✅ Move components to features/ (auth, chat, dashboard, profile, landing)
5. ✅ Move app/ to src/app/
6. ✅ Consolidate types into src/types/
7. ✅ Move lib/ to src/lib/
8. ✅ Move components/ to src/components/
9. ✅ Update all imports (use regex search/replace)
10. ✅ Test build: npm run build
11. ✅ Test dev: npm run dev
12. ✅ Delete old root folders
13. ✅ Delete old src/ (if separate)
```

---

## Tools & Scripts

### Bash Script for Import Refactoring
```bash
#!/bin/bash

# Replace import patterns
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]../../components/|from '"'"'@/features/|g' {} \;

find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]../../../components_parents|from '"'"'@/features/profile|g' {} \;

find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  's|from ['"'"'"]../../../types/|from '"'"'@/types/|g' {} \;
```

---

## Success Criteria

- ✅ Project builds without errors
- ✅ All pages load and render
- ✅ No console errors/warnings about imports
- ✅ All features functional (chat, dashboard, auth, profile)
- ✅ Locale switching works
- ✅ TypeScript strict mode passes (if enabled)
- ✅ Clear feature boundaries and no circular dependencies

---

## Post-Refactoring Benefits

1. **Scalability**: Easy to add new features without touching existing code
2. **Maintainability**: Clear folder structure and responsibilities
3. **Team Collaboration**: Each team member owns a feature folder
4. **Performance**: Better code splitting by feature
5. **Testing**: Easier to unit test isolated features
6. **Documentation**: Self-documenting folder structure
7. **Dependency Management**: Clear import patterns and public APIs

