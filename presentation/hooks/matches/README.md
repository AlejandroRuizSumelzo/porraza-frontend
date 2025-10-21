# Match Hooks

Server-side hooks for match-related operations.

## `useMatchCalendar`

Server-side hook to fetch the complete match calendar with all matches grouped by tournament phase.

### Usage

```tsx
// app/(app)/calendar/page.tsx
import { useMatchCalendar } from "@/presentation/hooks/matches/use-match-calendar";

export default async function CalendarPage() {
  const { calendar, error } = await useMatchCalendar();

  // Error handling
  if (error) {
    return (
      <div className="p-4">
        <h1>Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Loading state (shouldn't happen in server components, but good practice)
  if (!calendar) {
    return <div>Loading...</div>;
  }

  // Render calendar
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Match Calendar</h1>
      <p className="text-muted-foreground mb-6">
        Total Matches: {calendar.total}
      </p>

      {calendar.calendar.map((phase) => (
        <section key={phase.phase} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {phase.phase.replace(/_/g, " ")}
          </h2>
          <div className="grid gap-4">
            {phase.matches.map((match) => (
              <div
                key={match.id}
                className="border rounded-lg p-4 hover:bg-accent"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">
                      {match.homeTeam.name} vs {match.awayTeam.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {match.stadium.name}, {match.stadium.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{match.date}</p>
                    <p className="text-sm text-muted-foreground">{match.time}</p>
                  </div>
                </div>
                {match.score && (
                  <div className="mt-2 font-bold">
                    Score: {match.score.home} - {match.score.away}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
```

### Return Type

```typescript
interface UseMatchCalendarResult {
  calendar: MatchCalendar | null;
  error: string | null;
}
```

### Data Structure

The `calendar` object contains:

- **`total`**: Number of total matches
- **`calendar`**: Array of phase objects, each containing:
  - **`phase`**: Tournament phase (GROUP_STAGE, ROUND_OF_16, etc.)
  - **`matches`**: Array of match objects with complete information:
    - Match details (id, matchNumber, date, time, status)
    - Home and away teams (name, fifaCode, confederation, etc.)
    - Stadium information (name, city, country, capacity, etc.)
    - Scores (regular time, extra time, penalties) - nullable

### Example: Filter by Phase

```tsx
export default async function GroupStagePage() {
  const { calendar, error } = await useMatchCalendar();

  if (error || !calendar) {
    return <ErrorOrLoading />;
  }

  // Filter only GROUP_STAGE matches
  const groupStagePhase = calendar.calendar.find(
    (phase) => phase.phase === "GROUP_STAGE"
  );

  if (!groupStagePhase) {
    return <div>No group stage matches found</div>;
  }

  return (
    <div>
      <h1>Group Stage Matches</h1>
      {groupStagePhase.matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}
```

### Example: Filter by Date

```tsx
export default async function TodayMatchesPage() {
  const { calendar, error } = await useMatchCalendar();

  if (error || !calendar) {
    return <ErrorOrLoading />;
  }

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Get all matches from all phases
  const allMatches = calendar.calendar.flatMap((phase) => phase.matches);

  // Filter today's matches
  const todayMatches = allMatches.filter((match) => match.date === today);

  return (
    <div>
      <h1>Today's Matches ({today})</h1>
      {todayMatches.length === 0 ? (
        <p>No matches today</p>
      ) : (
        todayMatches.map((match) => <MatchCard key={match.id} match={match} />)
      )}
    </div>
  );
}
```

### Example: Group by Stadium

```tsx
export default async function StadiumMatchesPage() {
  const { calendar, error } = await useMatchCalendar();

  if (error || !calendar) {
    return <ErrorOrLoading />;
  }

  // Group matches by stadium
  const matchesByStadium = new Map();

  calendar.calendar.forEach((phase) => {
    phase.matches.forEach((match) => {
      const stadiumId = match.stadium.id;
      if (!matchesByStadium.has(stadiumId)) {
        matchesByStadium.set(stadiumId, {
          stadium: match.stadium,
          matches: [],
        });
      }
      matchesByStadium.get(stadiumId).matches.push(match);
    });
  });

  return (
    <div>
      <h1>Matches by Stadium</h1>
      {Array.from(matchesByStadium.values()).map(({ stadium, matches }) => (
        <section key={stadium.id}>
          <h2>
            {stadium.name} ({matches.length} matches)
          </h2>
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </section>
      ))}
    </div>
  );
}
```

### Notes

- This is a **server-side async function**, not a React hook (despite the name)
- Use it **only in Server Components** (Next.js 15 App Router)
- For Client Components, you'll need to fetch data from Server Components or use React Query
- The data is fetched fresh on each request (no caching by default)
- Add caching with Next.js `cache()` or `unstable_cache()` if needed
