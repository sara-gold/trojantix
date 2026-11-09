"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="rounded-lg border border-cardinal/30 bg-white p-4">
      <p className="font-semibold text-cardinal">Something went wrong loading this page.</p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-3 rounded-md bg-cardinal px-4 py-2 text-sm font-semibold text-white hover:bg-cardinal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cardinal"
      >
        Try again
      </button>
    </div>
  );
}
