# Architecture Overview

## Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── [locale]/                  # Internationalization segment
│   │   ├── (auth)/               # Route group: Authentication
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── access/
│   │   ├── (dashboard)/          # Route group: Protected pages
│   │   │   ├── chat/
│   │   │   ├── chat-history/
│   │   │   └── dashboard/
│   │   ├── (legal)/              # Route group: Legal pages
│   │   │   ├── privacy/
│   │   │   ├── terms/
│   │   │   ├── imprint/
│   │   │   └── subprocessors/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Locale layout
│   │   └── not-found.tsx
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Root redirect
│   └── api/                      # API routes
│       ├── access/
│       ├── auth/
│       └── chat/
│
├── features/                      # Business logic by domain
│   ├── auth/                     # Authentication feature
│   │   ├── components/           # Auth UI (LoginForm, etc.)
│   │   ├── index.ts             # Public API
│   │   └── ...
│   │
│   ├── chat/                     # Chat messaging feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── contexts/
│   │   ├── index.ts             # Public API
│   │   └── ...
│   │
│   ├── chat-history/            # Chat history feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── ...
│   │
│   ├── dashboard/               # Dashboard feature
│   │   ├── components/          # Dashboard UI
│   │   ├── forms/              # Form components
│   │   ├── sections/           # Section renderers
│   │   ├── hooks/              # Custom hooks
│   │   ├── types/              # Dashboard types
│   │   ├── store/              # Zustand store
│   │   ├── components/ui/      # UI utilities
│   │   ├── index.ts            # Public API
│   │   └── ...
│   │
│   ├── profile/                # User profile feature
│   │   ├── components/         # Parent/child profile UI
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── index.ts            # Public API
│   │   └── ...
│   │
│   ├── landing/                # Landing page feature
│   │   ├── components/         # Hero, Navigation, etc.
│   │   ├── index.ts            # Public API
│   │   └── ...
│   │
│   └── index.ts               # Feature exports aggregator
│
├── components/                  # Shared UI components
│   ├── ui/                     # shadcn/ui & base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   ├── layout/                 # Global layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Providers.tsx       # NextUI provider
│   │   └── Sidebar.tsx
│   │
│   ├── shared/                 # Reusable across features
│   │   └── ...
│   │
│   └── index.ts               # Shared components API
│
├── lib/                         # Utilities & configuration
│   ├── supabase/               # Supabase client/server
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── index.ts
│   │
│   ├── i18n/                   # Internationalization
│   │   ├── config.ts           # i18n configuration
│   │   └── index.ts
│   │
│   ├── llm/                    # LLM services
│   │   ├── llmService.ts
│   │   └── index.ts
│   │
│   ├── utils/                  # Utility functions
│   │   ├── formatting.ts
│   │   ├── validation.ts
│   │   └── ...
│   │
│   ├── constants/              # Application constants
│   │   └── index.ts
│   │
│   ├── hooks/                  # Global custom hooks
│   │   └── ...
│   │
│   └── index.ts               # Lib public API
│
├── types/                       # Global type definitions
│   ├── database.ts            # Database entity types
│   ├── dashboard.ts           # Dashboard-specific types
│   └── index.ts               # Global types export
│
├── messages/                    # i18n translation files
│   ├── en.json
│   ├── de.json
│   ├── es.json
│   └── pt.json
│
└── middleware.ts              # Next.js middleware (auth, i18n)
```

---

## Feature Structure Template

Each feature follows this consistent pattern:

```typescript
// src/features/[feature]/index.ts - PUBLIC API

// Export what other parts of the app need
export { Component1 } from './components/Component1'
export { useFeature } from './hooks/useFeature'
export type { FeatureType } from './types/feature'
export { featureService } from './services/featureService'

// Don't export internals:
// - Specific store instances (access via hooks)
// - Internal utilities
// - Implementation details
```

---

## Import Patterns

### ✅ Recommended

```typescript
// Import from feature index (clean, discoverable)
import { LoginForm, useAuth } from '@/features/auth'
import { Overview, PersonalData } from '@/features/dashboard'

// Import from lib
import { createClient } from '@/lib/supabase'
import { locales } from '@/lib/i18n'

// Import shared components
import { Button, Card } from '@/components'

// Import types
import type { User, Profile } from '@/types'
```

### ❌ Avoid

```typescript
// Avoid deep imports (breaks encapsulation)
import LoginForm from '@/features/auth/components/LoginForm'
import { useAuthService } from '@/features/auth/hooks/useAuthService'

// Avoid importing from components folder directly
import { Button } from '@/components/ui/button'

// Avoid mixing path styles
import { Component } from '../../../components/Component'
```

---

## Data Flow

### Authentication Example
```
app/[locale]/(auth)/login/page.tsx
    ↓
imports from @/features/auth
    ↓
<LoginForm /> component
    ↓
calls useAuth() hook
    ↓
useAuth() calls authService (business logic)
    ↓
authService calls @/lib/supabase (API)
    ↓
Result back to component
```

### Dashboard Example
```
app/[locale]/(dashboard)/dashboard/page.tsx
    ↓
imports from @/features/dashboard
    ↓
<DashboardClient /> component
    ↓
calls useProfile(), useChildren() hooks
    ↓
Hooks manage state via Zustand stores
    ↓
Display components (Overview, PersonalData, etc.)
    ↓
Forms handle user input
```

---

## Key Design Decisions

### 1. Feature Modules
- **What**: Self-contained business domains
- **Why**: Clear boundaries, easy to maintain, isolated testing
- **Example**: Everything related to auth in one place

### 2. Barrel Exports (index.ts)
- **What**: Re-export public APIs from feature roots
- **Why**: Cleaner imports, easier discoverability, encapsulation
- **Pattern**: `import { Component } from '@/features/auth'`

### 3. Route Groups
- **What**: Parenthesized folders like `(auth)/`, `(dashboard)/`
- **Why**: Organize related routes without URL changes
- **Benefit**: Cleaner navigation structure, shared layouts

### 4. Separation of Concerns
- **Routes** → UI only (thin pages)
- **Components** → Display logic only
- **Hooks** → State management and effects
- **Services** → Business logic (no React)
- **Types** → Type definitions

### 5. Shared vs Feature-Specific
- **Shared** (`src/components/`): Used across multiple features
- **Feature** (`src/features/*/`): Used only within one feature
- **Lib** (`src/lib/`): Utilities, config, external integrations

---

## Adding New Features

To add a new feature `[feature-name]`:

```bash
mkdir -p src/features/[feature-name]/{components,hooks,services,types}
touch src/features/[feature-name]/index.ts
```

Then populate:

```typescript
// src/features/[feature-name]/index.ts
export { Component1 } from './components/Component1'
export { useFeature } from './hooks/useFeature'
export type { FeatureType } from './types/feature'
```

---

## Configuration

### Path Aliases (tsconfig.json)
```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/features/*": ["./src/features/*"],
    "@/components/*": ["./src/components/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/types/*": ["./src/types/*"],
    "@/app/*": ["./src/app/*"]
  }
}
```

### Middleware (src/middleware.ts)
- Authentication checks
- Locale detection
- Route protection
- Redirects (login → access, etc.)

### i18n (src/lib/i18n/config.ts)
- Locale configuration
- Message loading
- Fallback language handling

---

## Performance

- **Code Splitting**: Routes are automatically code-split
- **Lazy Loading**: Components can be dynamically imported
- **Tree Shaking**: Unused exports are eliminated
- **Bundle Size**: ~87.8 kB shared chunks

---

## Testing Strategy (Recommended)

```
src/
├── features/
│   └── [feature]/
│       ├── components/
│       │   └── Component.test.tsx
│       ├── hooks/
│       │   └── useHook.test.ts
│       ├── services/
│       │   └── service.test.ts
│       └── __tests__/        # Integration tests
```

---

This architecture enables:
- ✅ **Scalability**: Add features without disrupting others
- ✅ **Maintainability**: Clear code organization
- ✅ **Collaboration**: Teams can work on isolated features
- ✅ **Testing**: Each feature is independently testable
- ✅ **Performance**: Optimized bundling and loading
