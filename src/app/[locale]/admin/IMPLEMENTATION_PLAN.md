# Admin Dashboard Implementation Plan

## Objective
Build a scalable admin dashboard for SafeMentor under the existing localized app structure, keeping the route thin and moving the business logic into feature-based modules.

## Guiding Principles
- Keep the route under [locale]/admin as the entry point only.
- Put reusable UI, hooks, services, and types under src/features/admin.
- Prefer server-side data loading first for simplicity and lower complexity.
- Use Tailwind + Recharts for the first version; add shadcn only where it clearly improves the UX.
- Deliver in small, testable slices instead of building all modules at once.

## Recommended Structure

src/
  app/
    [locale]/
      admin/
        page.tsx
        layout.tsx
        dashboard/
          page.tsx
          loading.tsx
          error.tsx
  features/
    admin/
      components/
        DashboardPage.tsx
        SummaryCards.tsx
        CostTrendChart.tsx
        UserGrowthChart.tsx
        AlertDistributionChart.tsx
        ModelUsageChart.tsx
        RecentAlertsTable.tsx
        DashboardFilters.tsx
      hooks/
        useAdminDashboard.ts
      services/
        dashboardService.ts
      types/
        index.ts
      index.ts
  lib/
    supabase/
      admin.ts
    queries/
      admin-dashboard.ts

## Implementation Phases

### Phase 1 - Foundation
1. Create the admin route shell and protect it with an admin-role check.
2. Create shared types for metrics, chart data, filters, and table rows.
3. Create a small service layer for Supabase queries.
4. Create a server-side loader for the initial dashboard payload.

Acceptance criteria:
- Only authorized admin users can access the page.
- The page loads without crashing and shows a loading or empty state.

### Phase 2 - MVP Dashboard
Build the minimum useful version first:
1. Summary cards:
   - total messages
   - total users
   - total children
   - total cost
   - flagged messages
   - average cost per message
2. Cost trend chart.
3. User growth chart.
4. Recent alerts table.

Acceptance criteria:
- The dashboard renders a complete overview without requiring extra APIs.
- Data is fetched from Supabase in a controlled, readable way.

### Phase 3 - Security and Usage Analytics
Add the second layer of insight:
1. Alert distribution chart.
2. Model usage chart.
3. Token efficiency metrics.
4. Optional subscription tier overview.

Acceptance criteria:
- The page shows both operational and safety-related metrics.
- The layout remains readable on desktop and tablet.

### Phase 4 - Interactivity and Filtering
Add lightweight interactivity:
1. Time range filter.
2. Model filter.
3. Alert level filter.
4. Empty-state and error-state handling.

Acceptance criteria:
- The user can change ranges and update the visualizations without a full page reload.
- The component state remains predictable and localized.

### Phase 5 - Polishing and Scaling
1. Add caching strategy for dashboard queries.
2. Add skeleton loading states.
3. Add pagination or server-side table loading for large datasets.
4. Optional: real-time refresh for high-importance metrics.

## Data Model and Query Strategy
Use a few aggregated queries first, then expand them gradually.

### Core queries
- Summary metrics
- Daily cost trend
- User growth over time
- Alert distribution
- Model usage and token cost
- Detailed cost breakdown table

### Recommended approach
- Start with plain Supabase queries.
- Keep aggregation logic in a dedicated query module.
- Avoid over-engineering with materialized views until the dashboard becomes heavily used.

## UI and Chart Choices
### Preferred stack for v1
- Tailwind CSS for layout and spacing
- Recharts for charts
- Lucide icons for visual clarity
- Existing app styling conventions for consistency

### Optional enhancement
- Add shadcn components only for:
  - date range picker
  - select inputs
  - card wrappers
  - table controls

This keeps the implementation practical while still allowing a more polished UI later.

## Suggested Delivery Order for an AI Agent
1. Create the route folder and entry page.
2. Create the types and a minimal dashboard service.
3. Implement summary cards.
4. Implement one chart.
5. Implement the second chart.
6. Implement the alerts table.
7. Add filters and loading states.
8. Refine layout and responsiveness.

## Scope for the First Version
The first version should focus on:
- clear admin overview
- cost and usage visibility
- safety alert visibility
- maintainable structure for future modules

## What to Avoid in the First Version
- Do not build every chart from the proposal immediately.
- Do not create too many abstraction layers before the first page works.
- Do not mix route logic, UI, and data access in the same file.

## Recommended Implementation Rule
Use this rule while building:
- page.tsx: route and auth
- feature component: UI rendering
- hook: data orchestration
- service/query module: database access
- types: shape definitions

This keeps the admin dashboard easy to extend as more modules are added.
