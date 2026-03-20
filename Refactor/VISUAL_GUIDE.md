# Visual Architecture Guide & Timeline

## Architecture Transformation Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                     BEFORE: Scattered Structure                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   next1_intl_proto/                                                  │
│   ├── app/                    ← Routes at ROOT                       │
│   ├── components/             ← ALL components mixed                 │
│   ├── components_parents/     ← Separate folder (confusion!)         │
│   ├── types/                  ← Global types at ROOT                 │
│   ├── lib/                    ← Utils at ROOT                        │
│   ├── src/                    ← DUPLICATE structure                  │
│   │   ├── app/                                                        │
│   │   ├── components/                                                │
│   │   └── lib/                                                       │
│   └── [other]                                                        │
│                                                                       │
│   PROBLEMS:                                                          │
│   ❌ No single source of truth                                       │
│   ❌ Unclear feature boundaries                                      │
│   ❌ Hard to find related code                                       │
│   ❌ Import chaos (many patterns)                                    │
│   ❌ Difficult to scale                                              │
│   ❌ Team coordination nightmare                                     │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ REFACTOR
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│              AFTER: Professional Feature-First Structure              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   next1_intl_proto/                                                  │
│   ├── src/                    ← SINGLE source of truth               │
│   │   ├── app/                ← Routes ONLY                          │
│   │   │   └── [locale]/                                             │
│   │   │       ├── (auth)/                                           │
│   │   │       ├── (dashboard)/                                      │
│   │   │       └── (legal)/                                          │
│   │   │                                                              │
│   │   ├── features/           ← Business logic by domain             │
│   │   │   ├── auth/           ← Auth domain                         │
│   │   │   │   ├── components/                                       │
│   │   │   │   ├── hooks/      ├─ Self-contained                     │
│   │   │   │   ├── services/   │  feature!                          │
│   │   │   │   ├── types/      │                                    │
│   │   │   │   └── index.ts    ← Public API                         │
│   │   │   │                                                          │
│   │   │   ├── chat/           ← Chat domain                         │
│   │   │   │   ├── components/                                       │
│   │   │   │   ├── hooks/      ├─ Self-contained                     │
│   │   │   │   ├── services/   │  feature!                          │
│   │   │   │   ├── store/      │                                    │
│   │   │   │   ├── types/      │                                    │
│   │   │   │   └── index.ts    ← Public API                         │
│   │   │   │                                                          │
│   │   │   ├── dashboard/                                            │
│   │   │   ├── profile/        ← NEW: Consolidated                   │
│   │   │   ├── landing/                                              │
│   │   │   └── compliance/                                           │
│   │   │                                                              │
│   │   ├── components/         ← Shared UI only                       │
│   │   │   ├── ui/             (shadcn, base components)             │
│   │   │   ├── layout/         (Header, Footer, Providers)           │
│   │   │   └── shared/         (Reusable across features)            │
│   │   │                                                              │
│   │   ├── lib/                ← Utilities & Config                   │
│   │   │   ├── supabase/                                             │
│   │   │   ├── i18n/                                                 │
│   │   │   ├── utils/                                                │
│   │   │   └── hooks/                                                │
│   │   │                                                              │
│   │   └── types/              ← Global type definitions              │
│   │       ├── database.ts                                           │
│   │       ├── api.ts                                                │
│   │       └── index.ts                                              │
│   │                                                                  │
│   ├── public/                 ← Static assets                        │
│   ├── messages/               ← i18n files                           │
│   ├── sql/                    ← Database documentation               │
│   └── [config files at root]  ← Keep here                           │
│                                                                       │
│   BENEFITS:                                                          │
│   ✅ Single source of truth (src/)                                   │
│   ✅ Clear feature boundaries                                        │
│   ✅ Easy to find related code                                       │
│   ✅ Consistent import patterns                                      │
│   ✅ Scales easily                                                   │
│   ✅ Team coordination simple                                        │
│   ✅ Self-documenting structure                                      │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Feature Module Deep Dive

### Feature "Auth" - Complete Example

```
src/features/auth/                              ← Feature boundary
│
├── components/                                 ← UI Layer
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── AccessLegalModal.tsx
│   ├── LoginLegalModal.tsx
│   └── index.ts                    ← Export components
│
├── hooks/                                      ← Application Layer
│   ├── useAuth.ts                 ← Main hook (component use this)
│   ├── useAuthValidation.ts
│   └── index.ts                    ← Export hooks
│
├── services/                                   ← Business Logic Layer
│   ├── authService.ts             ← Pure logic (no React)
│   └── index.ts
│
├── contexts/                                   ← State Container (optional)
│   ├── AuthContext.tsx
│   └── index.ts
│
├── types/                                      ← Type Definitions
│   ├── auth.ts
│   └── index.ts
│
└── index.ts                                    ← Public API
    ├── Export: LoginForm, RegisterForm, ...  (components)
    ├── Export: useAuth, ...                   (hooks)
    ├── Export: AuthUser, LoginCredentials ... (types)
    └── Export: authService                    (service)

DATA FLOW (One direction):
Router Page
    ↓
imports from @/features/auth
    ↓
<LoginForm />
    ├→ useAuth()              ← Gets state & methods
    │  └→ authService.login() ← Pure logic
    └→ User interaction

Separation of Concerns:
────────────────────────
✅ Components: What to show
✅ Hooks: How to manage state
✅ Services: Business logic
✅ Types: Data contracts
✅ Contexts: Cross-component state
```

---

## Dependency Graph

### Current (Messy)
```
                    ┌────────────────────┐
                    │  Page.tsx          │
                    └────────┬───────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ↓                    ↓                    ↓
    components/         types/                lib/
    ├── auth/           ├── auth.ts       ├── supabase/
    ├── dashboard/      └── dashboard.ts  ├── llm/
    └── ...                                └── ...
        ↓                                      ↓
    components_parents/  (DUPLICATE IMPORTS)
    
❌ CIRCULAR IMPORTS POSSIBLE
❌ UNCLEAR DEPENDENCIES
❌ HARD TO TRACE MESSAGE FLOW
```

### After (Clean)
```
                    ┌────────────────────┐
                    │  Page.tsx          │
                    └────────┬───────────┘
                             │
                    imports from @/features/auth
                             │
                ┌────────────┼────────────┐
                ↓            ↓            ↓
            Components    Hooks       Types
            (UI only)   (State)    (Contracts)
                │         │           │
                └────┬────┴───────────┘
                     ↓
                 Services
                (Business Logic)
                     ↓
                  @/lib/*
              (Utilities, APIs)

✅ UNIDIRECTIONAL DATA FLOW
✅ CLEAR DEPENDENCIES
✅ EASY TO TRACE MESSAGE FLOW
✅ NO CIRCULAR IMPORTS
```

---

## Import Pattern Examples

### Example 1: Login Page

```typescript
// BEFORE (Scattered)
// src/app/[locale]/auth/login/page.tsx
'use client'

import React from 'react'
import { LoginForm } from '../../../components/auth/LoginForm'
import { useAuth } from '../../../hooks/useAuth'
import type { LoginCredentials } from '../../../types/auth'
import { withAuthGuard } from '../../../lib/auth/guard'
import { useCallback } from 'react'

export default function LoginPage() {
  const { login, isLoading, error } = useAuth()
  
  const handleLogin = useCallback(async (creds: LoginCredentials) => {
    await login(creds)
  }, [login])
  
  return <LoginForm onSubmit={handleLogin} loading={isLoading} error={error} />
}

// AFTER (Clean)
// src/app/[locale]/(auth)/login/page.tsx
'use client'

import { LoginForm, useAuth } from '@/features/auth'

export default function LoginPage() {
  const { login, isLoading, error } = useAuth()
  
  return <LoginForm onSubmit={login} loading={isLoading} error={error} />
}

// KEY IMPROVEMENTS:
// ✅ Single import line (clean)
// ✅ Clear feature origin (@/features/auth)
// ✅ Shorter file
// ✅ All auth stuff in one place
```

---

### Example 2: Chat Component

```typescript
// BEFORE (Mixed concerns)
// components/chat/ChatScreen.tsx
import React from 'react'
import { ChatContainer } from '../ChatContainer'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { mentorClient } from '../../lib/llm/mentor-client'
import { usePouchDB } from '../../hooks/usePouchDB'
import { useChatStore } from '../../store/useChatStore'
import { useEffect, useState } from 'react'

export default function ChatScreen() {
  const [messages, setMessages] = useState([])
  const { db } = usePouchDB()
  const { selectedChild } = useChatStore()
  
  useEffect(() => {
    mentorClient.connect(selectedChild)
  }, [selectedChild])
  
  // ... lots of logic here
}

// AFTER (Clean separation)
// src/features/chat/components/ChatScreen.tsx
'use client'

import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { useChat } from '../hooks/useChat'

export default function ChatScreen() {
  const { messages, sendMessage, isLoading } = useChat()
  
  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} disabled={isLoading} />
    </div>
  )
}

// KEY IMPROVEMENTS:
// ✅ Component is pure UI
// ✅ All logic in hook
// ✅ Testable
// ✅ Reusable
// ✅ No direct service calls
```

---

### Example 3: Using Multiple Features

```typescript
// A page that uses both auth and chat features
// src/app/[locale]/(dashboard)/chat/page.tsx
'use client'

import { useAuth } from '@/features/auth'
import { ChatScreen, useChat } from '@/features/chat'

export default function ChatPage() {
  const { user } = useAuth()
  const { messages } = useChat()
  
  if (!user) {
    return <div>Loading...</div>
  }
  
  return <ChatScreen messages={messages} userId={user.id} />
}

// Features interact through:
// ✅ Hooks (useAuth, useChat)
// ✅ Not direct service access
// ✅ Not internal components
```

---

## Timeline & Effort Estimation

### Project Scope
- **Project Size**: Medium-Large (7+ features)
- **Complexity**: Medium (multiple interconnected features)
- **Team Size Recommendation**: 1-2 developers (can be parallelized)

### Estimated Timeline

```
┌──────────────────────────────────────────────────────────────┐
│ PHASE 1: Preparation & Setup (1-2 hours)                    │
├──────────────────────────────────────────────────────────────┤
│ Tasks:                                                       │
│ • Create complete directory structure             30 min      │
│ • Update tsconfig.json                            15 min      │
│ • Create this documentation                       30 min      │
│ • Team review & questions                         15 min      │
│                                                  ────────      │
│                                        Subtotal: 1.5 hours     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ PHASE 2: File Movement (2-3 hours)                           │
├──────────────────────────────────────────────────────────────┤
│ Tasks (Can be parallelized by feature):                      │
│ • Move auth feature           30 min                          │
│ • Move chat feature           45 min  (more complex)          │
│ • Move dashboard feature      45 min                          │
│ • Move profile feature        30 min                          │
│ • Move landing feature        15 min                          │
│ • Move types & lib            20 min                          │
│                                                  ────────      │
│                                        Subtotal: 3 hours       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ PHASE 3: Import Updates (3-5 hours)                          │
├──────────────────────────────────────────────────────────────┤
│ Tasks (Sequential - one feature at a time):                  │
│ • Auth imports & barrel exports       45 min                  │
│ • Chat imports & barrel exports       75 min (complex)        │
│ • Dashboard imports & barrel exports  75 min                  │
│ • Profile imports & barrel exports    45 min                  │
│ • Landing imports & barrel exports    30 min                  │
│ • App router imports                  30 min                  │
│ • Shared components imports           20 min                  │
│                                                  ────────      │
│                                        Subtotal: 5 hours       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ PHASE 4: Testing & Verification (2-3 hours)                 │
├──────────────────────────────────────────────────────────────┤
│ Tasks:                                                       │
│ • npm run build                       30 min                  │
│ • Fix any build errors                60 min                  │
│ • npm run dev + test features         60 min                  │
│ • Fix runtime errors                  30 min                  │
│                                                  ────────      │
│                                        Subtotal: 2.5 hours     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ PHASE 5: Cleanup & Documentation (1 hour)                    │
├──────────────────────────────────────────────────────────────┤
│ Tasks:                                                       │
│ • Delete old folders                  15 min                  │
│ • Update project README               20 min                  │
│ • Create team onboarding docs         20 min                  │
│                                                  ────────      │
│                                        Subtotal: 1 hour        │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                                                               │
│                    TOTAL: 12-15 hours                         │
│                   (1-2 developer-days of focused work)        │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### By Team Size

| Team Size | Approach | Estimated Time |
|-----------|----------|-----------------|
| **1 person** | Sequential (phase by phase) | 2-3 business days |
| **2 people** | Parallel (1 does setup, 1 reviews & creates dirs) | 1.5-2 business days |
| **3+ people** | Parallel by feature (one person per feature) | 1 business day |

---

## Risk Assessment

### Low Risk ✅
- Creating new folder structure (doesn't affect code)
- Adding path aliases in tsconfig.json
- Creating barrel exports (index.ts files)
- Creating new features from scratch

### Medium Risk ⚠️
- Moving files (could break imports if not careful)
- Updating many imports at once
- Restructuring routes

**Mitigation:**
- Use git commits for each phase
- Use IDE refactoring tools for large import updates
- Test after each major move

### High Risk 🚨
- Circular dependencies introduced
- Breaking the app during transition

**Prevention:**
- Run linter frequently
- Test after each feature migration
- Use `npm run build` to catch all issues

---

## Success Checklist

### Before Starting
- [ ] All changes committed to git
- [ ] Team agrees on plan
- [ ] No active development on other branches
- [ ] Documentation reviewed

### During Implementation
- [ ] One phase completed at a time
- [ ] Build passing after each phase
- [ ] Tests run and pass
- [ ] Features manually tested

### Final Verification
- [ ] `npm run build` success (zero errors)
- [ ] `npm run dev` success (zero warnings)
- [ ] All pages load
- [ ] Auth flow works
- [ ] Chat feature works
- [ ] Dashboard pages work
- [ ] Locale switching works
- [ ] No 404s or console errors
- [ ] TypeScript check clean (if using)
- [ ] Linter happy (if using ESLint)

### Post-Migration
- [ ] Old folders deleted
- [ ] README updated
- [ ] Team trained on structure
- [ ] On-boarding docs created
- [ ] Code review on final state

---

## Common Pitfalls & Solutions

### Pitfall 1: Circular Imports
```typescript
// ❌ BAD
// services/authService.ts
import { useAuth } from '../hooks/useAuth'  // Circular!

// hooks/useAuth.ts
import { authService } from '../services/authService' // Circles back!
```

**Solution:** One-way dependency: Components → Hooks → Services

---

### Pitfall 2: Forgetting Barrel Exports
```typescript
// Without index.ts
import { LoginForm } from '@/features/auth/components/LoginForm'
import { LoginForm2 } from '@/features/auth/components/LoginForm2'
import { useAuth } from '@/features/auth/hooks/useAuth'

// With index.ts
import { LoginForm, LoginForm2, useAuth } from '@/features/auth'
```

---

### Pitfall 3: Breaking Route Structure
```typescript
// ❌ WRONG: Breaking routes with parentheses
src/app/
├── auth/              ← No parentheses! Routes exist here
├── login/             ← This becomes a real route (/login)
└── page.tsx

// ✅ CORRECT: Route groups don't affect URL
src/app/
└── (auth)/            ← Parentheses code it as group
    ├── login/            → Route is still /en/login
    ├── register/         → Route is still /en/register
    └── verified/         → Route is still /en/verified
```

---

### Pitfall 4: Inconsistent Import Aliases
```typescript
// ❌ MIX OF STYLES
import { LoginForm } from '@/features/auth'
import { ChatScreen } from '../../features/chat'
import { useProfile } from '@/features/profile'
import { Header } from '../components/Header'

// ✅ CONSISTENT
import { LoginForm } from '@/features/auth'
import { ChatScreen } from '@/features/chat'
import { useProfile } from '@/features/profile'
import { Header } from '@/components/layout'
```

---

## Post-Refactoring Workflow

### How to add a new feature after refactoring

```bash
# 1. Create feature structure
mkdir -p src/features/newfeature/{components,hooks,services,types,store}

# 2. Create files (components, hooks, services, etc.)
touch src/features/newfeature/components/NewComponent.tsx
touch src/features/newfeature/hooks/useNewFeature.ts
touch src/features/newfeature/services/newService.ts
touch src/features/newfeature/types/newfeature.ts

# 3. Create barrel export
touch src/features/newfeature/index.ts
# Add exports to index.ts

# 4. Create route if needed
mkdir -p src/app/[locale]/newroute
touch src/app/[locale]/newroute/page.tsx

# 5. Import feature in route
# import { NewComponent } from '@/features/newfeature'

# 6. Test
npm run build
npm run dev
```

---

## Education Materials for Team

### For Junior Developers
- Start with `QUICK_REFERENCE.md`
- Learn feature structure from one complete feature
- Follow the pattern for new code

### For Senior Developers
- Review `REFACTORING_PLAN.md` for rationale
- Understand `IMPLEMENTATION_GUIDE.md` for edge cases
- Lead code reviews on feature organization

### For Architects
- Document patterns in team wiki
- Create linting rules for imports
- Consider adding `eslint-plugin-boundaries` for architecture enforcement

---

## Maintenance & Evolution

### 1 Month After Refactoring
- [ ] Team trained on structure
- [ ] New features follow pattern
- [ ] No regressions found
- [ ] Developer velocity improved

### 3 Months After Refactoring
- [ ] Architecture stable
- [ ] New developers onboard faster
- [ ] Code quality improved
- [ ] Dependency issues rare

### 6 Months After Refactoring
- Look for emerging patterns
- Consider extracting shared sub-features
- Evaluate monorepo if multiple services needed

