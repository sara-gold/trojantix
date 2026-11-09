// USC home football games for the 2026 season, all at the L.A. Memorial Coliseum.
// Source: https://usctrojans.com/sports/football/schedule/text/2026
// This is the one source of truth for games; listings and the AI quick post
// will both be checked against these slugs.

export type Game = {
  slug: string;
  opponent: string;
  /** Game day in Los Angeles, as YYYY-MM-DD. */
  date: string;
  /** Local kickoff time, or null while it's still TBD. */
  kickoff: string | null;
};

export const VENUE = "L.A. Memorial Coliseum";
export const SEASON = 2026;

export const GAMES: readonly Game[] = [
  { slug: "san-jose-state", opponent: "San José State", date: "2026-08-29", kickoff: "12:00 PM" },
  { slug: "fresno-state", opponent: "Fresno State", date: "2026-09-04", kickoff: "6:00 PM" },
  { slug: "louisiana", opponent: "Louisiana", date: "2026-09-12", kickoff: "8:00 PM" },
  { slug: "oregon", opponent: "Oregon", date: "2026-09-26", kickoff: "4:30 PM" },
  { slug: "washington", opponent: "Washington", date: "2026-10-03", kickoff: "4:30 PM" },
  { slug: "ohio-state", opponent: "Ohio State", date: "2026-10-31", kickoff: "4:30 PM" },
  { slug: "maryland", opponent: "Maryland", date: "2026-11-21", kickoff: null },
];

export function getGameBySlug(slug: string): Game | undefined {
  return GAMES.find((game) => game.slug === slug);
}

/** Today's date in Los Angeles as YYYY-MM-DD (the en-CA locale formats it that way). */
export function todayInLA(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
  }).format(now);
}

/** A game counts as upcoming through the end of game day. */
export function splitGames(today: string) {
  return {
    upcoming: GAMES.filter((game) => game.date >= today),
    played: GAMES.filter((game) => game.date < today),
  };
}

/** "Sat, Nov 21". Parsed at noon UTC so the day can't shift across time zones. */
export function formatGameDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
