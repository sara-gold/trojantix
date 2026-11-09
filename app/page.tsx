import { Suspense } from "react";
import { connection } from "next/server";
import { formatGameDate, SEASON, splitGames, todayInLA, VENUE, type Game } from "@/lib/games";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">{SEASON} home games</h1>
      <p className="mt-1 text-stone-600">
        Student tickets for every USC home game, from fellow Trojans. All games at the {VENUE}.
      </p>
      <Suspense fallback={<GameListSkeleton />}>
        <GameList />
      </Suspense>
    </>
  );
}

async function GameList() {
  // Which games are "played" depends on today's date, so render per request.
  await connection();
  const { upcoming, played } = splitGames(todayInLA());

  return (
    <>
      <section aria-labelledby="upcoming-heading" className="mt-6">
        <h2 id="upcoming-heading" className="text-sm font-semibold uppercase tracking-wide text-stone-600">
          Upcoming
        </h2>
        {upcoming.length === 0 ? (
          <p className="mt-2 rounded-lg border border-dashed border-stone-300 p-4 text-stone-600">
            No upcoming home games left this season.
          </p>
        ) : (
          <ul className="mt-2 space-y-2">
            {upcoming.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </ul>
        )}
      </section>

      {played.length > 0 && (
        <section aria-labelledby="played-heading" className="mt-8">
          <h2 id="played-heading" className="text-sm font-semibold uppercase tracking-wide text-stone-600">
            Already played
          </h2>
          <ul className="mt-2 space-y-2">
            {played.map((game) => (
              <GameCard key={game.slug} game={game} played />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function GameCard({ game, played = false }: { game: Game; played?: boolean }) {
  return (
    <li
      className={`flex items-center justify-between gap-3 rounded-lg border bg-white p-4 ${
        played ? "border-stone-200 text-stone-500" : "border-stone-300 border-l-4 border-l-cardinal"
      }`}
    >
      <div>
        <p className={`font-semibold ${played ? "" : "text-stone-900"}`}>vs. {game.opponent}</p>
        <p className="text-sm">
          <time dateTime={game.date}>{formatGameDate(game.date)}</time>
          {" · "}
          {game.kickoff ?? "Kickoff TBD"}
        </p>
      </div>
      {played ? (
        <span className="shrink-0 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600">
          Played
        </span>
      ) : (
        <span className="shrink-0 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-stone-900">
          Home
        </span>
      )}
    </li>
  );
}

function GameListSkeleton() {
  return (
    <div className="mt-6 space-y-2" role="status" aria-label="Loading games">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-[74px] animate-pulse rounded-lg bg-stone-200" />
      ))}
    </div>
  );
}
