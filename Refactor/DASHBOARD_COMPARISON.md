# Dashboard Comparison: Production vs. Figma Designs

This document outlines the differences between the current parent dashboard implementation and the Figma-generated designs. The goal is to identify missing features and design elements to bridge the gap toward the final product.

## 🏗️ Architectural Differences

| Feature              | Current Dashboard (`/app/[locale]/dashboard`) | Figma Designs (`/components_parents`)        |
| :------------------- | :-------------------------------------------- | :------------------------------------------- |
| **Routing**          | Native Next.js App Router (Modular)           | Custom `NavigationFlow.tsx` (Monolithic)     |
| **State Management** | Supabase Session & Real Database              | Mock Services (`api.ts`)                     |
| **i18n**             | Full `next-intl` Support                      | Static English Labels                        |
| **Visual Identity**  | Standard NextUI/Tailwind (Modern/Minimal)     | "Honest/Brutalist" Wireframe (High Contrast) |

---

## 🎨 Design & UI Differences

### 1. Visual Style

- **Production**: Uses standard shadcn/NextUI patterns—thin borders, subtle shadows, and a light color palette.
- **Figma**: Uses a unique "Brutalist" aesthetic—thick 2px/4px black borders, high-contrast layouts, and a specific sage-green palette (`#889A7F`).

### 2. Information Focus

- **Production**: Currently acts as a **Settings Page**. It focuses on CRUD operations: editing names, addresses, billing, and child profile details.
- **Figma**: Acts as a **Monitoring Hub**. It prioritizes safety metrics, current risk levels, and emotional trends over administrative settings.

---

## 🚩 Missing Features in Production

The following features exist in the Figma designs but are currently missing or simplified in the production dashboard:

### 🛡️ Safety & Monitoring

- **Risk Level Indicator**: A high-visibility card showing "No Concerns", "Yellow Flag", or "Red Flag" with clear definitions.
- **Safety Notifications**: A dedicated alert system including "Guidance" on how to handle specific red flags (e.g., self-harm patterns).
- **Parental Action Log**: A log to track when parents have acknowledged alerts or viewed crisis guides (crucial for AADC/KOSA compliance).

### 📈 Emotional Insights

- **Emotion Overview**: Dedicated section with aggregated sentiment charts (Positive, Neutral, Needs Support).
- **Trend Analysis**: Line charts showing emotional patterns over 7 or 30 days without exposing private chat content.

### 🔐 Advanced Onboarding

- **VPC (Verifiable Parental Consent)**: A multi-step flow for verifying identity (via SMS) required by COPPA/AADC.
- **Legal "Non-Friend" Clause**: Explicit agreements ensuring parents explain the AI's nature to their children.

### 📱 Pairing & Connections

- **QR Pairing Flow**: A dedicated interface for generating and scanning pairing codes to link a child's device.

---

## 🔍 Note on `components/dashboard2`

There is an existing directory in `components/dashboard2` that already implements some of the Figma patterns (using NextUI cards and `recharts` for sentiment analysis).

- **Current Linkage**: This directory seems to be a partially integrated version of the Figma designs but uses the standard NextUI styling instead of the "Brutalist" thick-border style.
- **Action**: This folder should serve as the primary source for actual dashboard logic (charts, real data fetching) while the "Brutal" styling from `components_parents` is applied to it.

---

## 🛠️ Recommended Migration Path

1.  **Rebrand the Layout**: Adopt the Figma "Brutalist" styling (thick borders, HSL colors) in `DashboardSidebar.tsx` and `DashboardMobileHeader.tsx`.
2.  **Transform the "Overview"**: Move the current settings forms to a "Settings" tab and make the "Overview" a health-check dashboard using cards from `ParentAccountOverview.tsx`.
3.  **Implement the Action Log**: Build the backend support for tracking parental acknowledgments of safety alerts.
4.  **Integrate Charts**: Use the existing `recharts` logic found in `ParentDashboardUI.tsx` to display real emotional data from the database.
