"use client";

import { RulesPageContent } from "@/presentation/components/rules/rules-page-content";

/**
 * Rules Page (Client Component)
 * Displays comprehensive rules and scoring system for the World Cup prediction game
 *
 * Design:
 * - Modern, minimalist UI with shadcn/ui components
 * - Tabbed interface: Scoring, Group Stage, Knockout, FIFA Rules
 * - Color-coded point values with badges
 * - Expandable sections with detailed explanations
 * - Icons for visual clarity
 * - Responsive layout
 *
 * IMPORTANT: Client Component
 * - Uses useSidebar hook for sidebar state
 * - Manages tabs navigation client-side
 *
 * Clean Architecture:
 * - Page component is THIN - only imports the content component
 * - All UI logic is in RulesPageContent
 * - No business logic required (static content)
 */
export default function RulesPage() {
  return <RulesPageContent />;
}
