'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[30vh] flex flex-col items-center justify-center gap-3 p-6">
      <h2 className="text-xl font-semibold">
        Something went wrong in Careers.
      </h2>
      <button
        onClick={() => reset()}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
