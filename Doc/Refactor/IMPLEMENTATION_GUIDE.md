# Refactoring Implementation Guide

## Step 1: Update TypeScript Configuration

### Update `tsconfig.json`

The current path alias `@/*: ["./*"]` is too broad and works against the refactoring goals. Update to:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/app/*": ["./src/app/*"],
      "@/features/*": ["./src/features/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

**Key changes:**
- ✅ `@/*` now points to `src/` (all source code centralized)
- ✅ Added specific path aliases for clarity
- ✅ Removed `components_parents` from exclude (it will be deleted)

---

## Step 2: Update Next.js Configuration

### Update `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly set src directory
  // Note: Next.js 14+ will auto-detect src/app, but explicit is clearer
  
  // Add your other configs
  experimental: {
    // Ensure proper optimization
  },
};

export default nextConfig;
```

**Note:** Next.js 14+ automatically uses `src/app` if it exists. The main config you need is in `tsconfig.json`.

---

## Step 3: Create Directory Structure

Run these commands to create the feature-based structure:

```bash
# Create features structure
mkdir -p src/features/{auth,chat,chat-history,dashboard,profile,compliance,landing}/{components,hooks,services,types,store,contexts,forms,sections}

# Create shared components structure  
mkdir -p src/components/{ui,layout,shared}

# Create lib structure
mkdir -p src/lib/{supabase,i18n,llm,utils,constants,hooks}

# Create global types
mkdir -p src/types
```

---

## Step 4: Feature Consolidation Details

### 4.1 Auth Feature

**Source files to move to `src/features/auth/`:**

```
FROM:
- components/auth/LoginForm.tsx              → src/features/auth/components/
- components/auth/RegisterForm.tsx           → src/features/auth/components/
- components/auth/AccessLegalModal.tsx       → src/features/auth/components/
- components/auth/LoginLegalModal.tsx        → src/features/auth/components/

CREATE NEW:
- src/features/auth/services/authService.ts  (centralize auth logic)
- src/features/auth/contexts/AuthContext.tsx (if not exists)
- src/features/auth/hooks/useAuth.ts         (consolidate)
- src/features/auth/types/auth.ts
- src/features/auth/index.ts                 (barrel export)
```

**Create `src/features/auth/index.ts`:**
```typescript
// Components
export { default as LoginForm } from './components/LoginForm'
export { default as RegisterForm } from './components/RegisterForm'
export { default as AccessLegalModal } from './components/AccessLegalModal'
export { default as LoginLegalModal } from './components/LoginLegalModal'

// Hooks
export { useAuth } from './hooks/useAuth'

// Types
export type { AuthUser, LoginCredentials, RegisterData } from './types/auth'

// Services
export { authService } from './services/authService'
```

---

### 4.2 Chat Feature

**Source files to move to `src/features/chat/`:**

```
FROM:
- components/ChatScreen.tsx (if exists elsewhere)
- Any chat-related components
- lib/llm/mentor-client.ts → services/mentorService.ts
- lib/pouchdb.ts → services/pouchdbService.ts

CREATE NEW:
- src/features/chat/contexts/ChatContext.tsx
- src/features/chat/contexts/ChildContext.tsx
- src/features/chat/services/mentorService.ts
- src/features/chat/services/pouchdbService.ts
- src/features/chat/services/syncService.ts
- src/features/chat/store/chatStore.ts (Zustand)
- src/features/chat/hooks/useMessages.ts
- src/features/chat/types/chat.ts
- src/features/chat/types/mentor.ts
- src/features/chat/index.ts
```

**Create `src/features/chat/store/chatStore.ts` example:**
```typescript
import { create } from 'zustand'
import type { ChatMessage, ChatState } from '../types/chat'

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  selectedChild: null,
  isLoading: false,
  
  addMessage: (message: ChatMessage) => 
    set((state) => ({ messages: [...state.messages, message] })),
  
  setSelectedChild: (childId: string | null) =>
    set({ selectedChild: childId }),
  
  setLoading: (isLoading: boolean) =>
    set({ isLoading }),
}))
```

---

### 4.3 Dashboard Feature

**Source files to move to `src/features/dashboard/`:**

```
FROM:
- components/dashboard2/* → components/
- types/dashboard2.ts → types/dashboard.ts

CONSOLIDATE:
- All form components → forms/
- Section components → sections/
- All hooks → hooks/
```

**Create `src/features/dashboard/forms/index.ts`:**
```typescript
export { default as PersonalInfoForm } from './PersonalInfoForm'
export { default as AddressForm } from './AddressForm'
export { default as BillingForm } from './BillingForm'
export { default as ChildForm } from './ChildForm'
export { default as CommunicationForm } from './CommunicationForm'
export { default as ContactInfoForm } from './ContactInfoForm'
export { default as PaymentDataForm } from './PaymentDataForm'
export { default as PreferencesForm } from './PreferencesForm'
```

---

### 4.4 Profile Feature (NEW - CONSOLIDATION)

**Source files to move to `src/features/profile/`:**

```
FROM:
- components_parents/ParentAccountOverview.tsx
- components_parents/ParentChildConnection.tsx
- components_parents/ParentEmotionOverview.tsx
- components_parents/ParentHelp.tsx
- components_parents/ParentLogin.tsx
- components_parents/ParentPrivacy.tsx
- components_parents/ParentSafetyNotifications.tsx
- components_parents/ParentSettings.tsx
- components_parents/ChildQRPairing.tsx
- components_parents/ChildSafetyNotice.tsx
- components_parents/NavigationFlow.tsx (if parent-specific)

KEEP:
- components_parents/figma/ → docs/figma/ (move outside src if design only)
- components_parents/ui/* → already in components/ui/
- components_parents/website/* → if used, move to features OR docs
```

**Create `src/features/profile/index.ts`:**
```typescript
// Parent-specific components
export { default as ParentAccountOverview } from './components/ParentAccountOverview'
export { default as ParentChildConnection } from './components/ParentChildConnection'
export { default as ParentEmotionOverview } from './components/ParentEmotionOverview'
export { default as ParentHelp } from './components/ParentHelp'
export { default as ParentLogin } from './components/ParentLogin'
export { default as ParentPrivacy } from './components/ParentPrivacy'
export { default as ParentSafetyNotifications } from './components/ParentSafetyNotifications'
export { default as ParentSettings } from './components/ParentSettings'
export { default as ChildQRPairing } from './components/ChildQRPairing'
export { default as ChildSafetyNotice } from './components/ChildSafetyNotice'

// Hooks
export { useProfile } from './hooks/useProfile'

// Types
export type { ProfileUser, ParentConnection } from './types/profile'
```

---

### 4.5 Landing Feature

**Source files to move to `src/features/landing/`:**

```
FROM:
- components/landing/* → components/

All files in landing/ folder already organized well.
```

**Create `src/features/landing/index.ts`:**
```typescript
export { default as Hero } from './components/Hero'
export { default as SafeMentorHero } from './components/SafeMentorHero'
export { default as Features } from './components/Features'
export { default as ApproachSection } from './components/ApproachSection'
export { default as CTASection } from './components/CTASection'
export { default as FamiliesSection } from './components/FamiliesSection'
export { default as TestimonialSection } from './components/TestimonialSection'
export { default as ValuesSection } from './components/ValuesSection'
export { default as TrustBadges } from './components/TrustBadges'
export { default as Trusted } from './components/Trusted'
export { default as Navigation } from './components/Navigation'
export { default as Footer } from './components/Footer'
export { default as SafeMentorFooter } from './components/SafeMentorFooter'
```

---

### 4.6 Compliance Feature (NEW)

**Source files to move to `src/features/compliance/`:**

```
FROM:
- components/register/* → This feature is new, but consolidates compliance-related pages

CREATE:
- src/features/compliance/components/ComplianceFrame.tsx
- src/features/compliance/components/ConsentToggles.tsx
- src/features/compliance/components/DataUsageSection.tsx
- src/features/compliance/components/PrivacySidebar.tsx
- src/features/compliance/components/TransparencyReport.tsx
- src/features/compliance/types/compliance.ts
- src/features/compliance/index.ts
```

---

## Step 5: Route Structure Migration

### Current Route Structure
```
app/[locale]/
├── layout.tsx
├── page.tsx
├── not-found.tsx
├── access/page.tsx
├── auth/callback/route.ts
├── auth/verified/page.tsx
├── chat/page.tsx
├── chat-history/page.tsx           ← NEW ROUTE
├── dashboard/page.tsx
├── imprint/page.tsx
├── privacy/page.tsx
├── register/page.tsx
├── subprocessors/page.tsx
├── terms/page.tsx
└── [...rest]/page.tsx
```

### Refactored Route Structure (NEW)
```
src/app/
├── layout.tsx                      (root layout)
├── not-found.tsx
├── [locale]/
│   ├── layout.tsx                  (locale layout)
│   ├── page.tsx                    (home/landing)
│   ├── not-found.tsx
│   ├── (auth)/                     ← ROUTE GROUP
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── access/
│   │   │   └── page.tsx
│   │   ├── verified/
│   │   │   └── page.tsx
│   │   └── callback/
│   │       └── route.ts
│   ├── (dashboard)/                ← ROUTE GROUP
│   │   ├── chat/
│   │   │   └── page.tsx
│   │   ├── chat-history/
│   │   │   └── page.tsx
│   │   └── dashboard/
│   │       └── page.tsx
│   ├── (legal)/                    ← ROUTE GROUP
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   ├── imprint/
│   │   │   └── page.tsx
│   │   └── subprocessors/
│   │       └── page.tsx
│   └── [...rest]/
│       └── page.tsx
└── api/
    ├── access/
    │   └── route.ts
    ├── auth/
    │   └── route.ts
    └── chat/
        └── route.ts
```

**Benefits of route groups:**
- Group related pages (auth pages together, legal pages together, etc.)
- Don't affect URL structure: `/en/login` stays the same
- Clear organization and visual hierarchy
- Easy to add middleware or layouts to groups

---

## Step 6: Import Migration Template

### Find and Replace Patterns

Use your IDE's find/replace with regex to update imports:

#### Pattern 1: Components from root level
```
Find:    from ["'](\.\.\/)*components/([^/]+)/(.+)["']
Replace: from '@/features/$2/components'

Example:
  OLD: from '../../components/auth/LoginForm'
  NEW: from '@/features/auth/components/LoginForm'
```

#### Pattern 2: Components from components_parents
```
Find:    from ["'](\.\.\/)*(components_parents|components_parents\/[^/]+)/(.+)["']
Replace: from '@/features/profile/components'

Example:
  OLD: from '../../../components_parents/ParentAccountOverview'
  NEW: from '@/features/profile/components/ParentAccountOverview'
```

#### Pattern 3: Types consolidation
```
Find:    from ["'](\.\.\/)*types/(.+)["']
Replace: from '@/types'

Example:
  OLD: from '../../types/dashboard'
  NEW: from '@/types'
```

#### Pattern 4: Lib utilities
```
Find:    from ["'](\.\.\/)*lib/(.+)/(.+)["']
Replace: from '@/lib/$2'

Example:
  OLD: from '../lib/supabase/client'
  NEW: from '@/lib/supabase'
```

#### Pattern 5: Hooks from different locations
```
Find:    from ["'](\.\.\/)*hooks/(.+)["']
Replace: from '@/features/[FEATURE]/hooks'
         (manually select feature)

Example:
  OLD: from '../../hooks/useAuth'
  NEW: from '@/features/auth/hooks/useAuth'
```

---

## Step 7: Feature API Design (index.ts)

Each feature should export a clean public API. Pattern:

```typescript
// src/features/[feature]/index.ts

// ✅ DO: Export what features need
export * from './components'
export * from './hooks'
export { authService } from './services/authService'
export type { AuthUser, LoginCredentials } from './types/auth'

// ❌ DON'T: Export internal stuff
// - Don't export services directly, use hooks instead
// - Don't export contexts directly
// - Don't export store directly (access via hooks)
```

---

## Step 8: Example File Refactoring

### Example: Chat Page Component

**BEFORE (scattered imports):**
```typescript
// app/[locale]/chat/page.tsx
'use client'

import React from 'react'
import { ChatScreen } from '@/components/chat/ChatScreen'  // ❌ Wrong path
import { useChat } from '@/hooks/useChat'                  // ❌ Wrong path
import { mentorClient } from '@/lib/llm/mentor-client'    // ❌ Internal service
import type { ChatMessage } from '@/types/chat'            // ❌ Needs consolidation
import { useChatStore } from '@/store/useChatStore'       // ❌ Wrong path structure

export default function ChatPage() {
  const { messages } = useChat()
  const { selectedChild } = useChatStore()
  
  return <ChatScreen messages={messages} />
}
```

**AFTER (clean feature-based imports):**
```typescript
// src/app/[locale]/(dashboard)/chat/page.tsx
'use client'

import React from 'react'
import { ChatScreen, useChat } from '@/features/chat'

export default function ChatPage() {
  const { messages } = useChat()
  
  return <ChatScreen messages={messages} />
}
```

**Notice the benefits:**
- ✅ Single import statement
- ✅ Clear feature origin
- ✅ No access to internal services/store (via useChat hook)
- ✅ Type safety through exported types

---

## Step 9: Middleware Configuration

If using Next.js middleware for i18n, structure it cleanly:

**Option A: Keep at root (Next.js default)**
```
middleware.ts (at root)
```

**Option B: Move to src (for consistency)**
```
src/middleware.ts
```

Then update `next.config.ts` if needed to reference it.

---

## Step 10: Environment Variables

Keep `.env.local` at root (Next.js standard), but organize service configuration:

```typescript
// src/lib/supabase/config.ts
export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
}

// Usage in services
import { SUPABASE_CONFIG } from '@/lib/supabase/config'
const client = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key)
```

---

## Step 11: Verification Checklist

### Build Verification
```bash
npm run build
```
✅ Must complete without errors
✅ Check for import resolution warnings

### Development Verification
```bash
npm run dev
```
✅ No console errors
✅ All pages load without 404s
✅ Feature functionality works:
  - [ ] Auth flow (login/register)
  - [ ] Chat feature
  - [ ] Dashboard pages
  - [ ] Locale switching
  - [ ] Profile pages

### Import Verification
```bash
# Find any remaining old import patterns
grep -r "components/" src/ --include="*.ts" --include="*.tsx" | grep -v "@/components" | grep -v node_modules
grep -r "components_parents" src/ --include="*.ts" --include="*.tsx"
grep -r "types/" src/ --include="*.ts" --include="*.tsx" | grep -v "@/types"
```

---

## Step 12: Cleanup

Once refactoring is verified working:

```bash
# Remove old root-level folders
rm -rf components/
rm -rf components_parents/
rm -rf types/
rm -rf app/                          # Only if fully migrated to src/app
rm -rf src/app (old)                # If had separate src/app
```

Keep:
- ✅ `src/`
- ✅ `public/`
- ✅ `messages/`
- ✅ `sql/`
- ✅ All config files at root

---

## Troubleshooting

### Issue: Import Resolution Fails
**Solution:** 
1. Clear `.next` folder: `rm -rf .next`
2. Restart dev server: `npm run dev`
3. Check `tsconfig.json` paths are correct

### Issue: Module Not Found Errors
**Check:**
1. File path matches case sensitivity (important on Linux/Mac)
2. `index.ts` exists in folder if using barrel exports
3. Path alias in `tsconfig.json` is correct

### Issue: Type Errors After Migration
**Solution:**
1. Delete `node_modules/.cache` 
2. Run: `npm run build` for full type check
3. Look for circular dependency issues

### Issue: Next.js App Router Not Finding Pages
**Check:**
1. Pages are in `src/app/[locale]/` structure
2. Route groups have parentheses: `(groupname)/`
3. `.next` folder is rebuilt

---

## Expected Outcome

After refactoring, your project will have:

✅ **Clear separation**: Routes separate from logic
✅ **Feature isolation**: Each domain is self-contained
✅ **Scalability**: Easy to add new features
✅ **Maintainability**: Clear import paths and public APIs
✅ **Team efficiency**: Features assigned per developer
✅ **Performance**: Better code splitting by feature

