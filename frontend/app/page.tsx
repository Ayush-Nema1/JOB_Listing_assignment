"use client";

import { useEffect, useState } from "react";

// Frontend alag origin par hai, isliye backend ka URL environment variable se le rahe hain.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
const PAGE_SIZE = 6;

type JobListing = {
  id: number;
  title: string;
  company: string;
  location: string;
  experience: string;
  salary: string;
  employment_type: string;
  posted: string;
};

type ApiResponse = {
  items: JobListing[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    // Purani request ko cancel kar dete hain, warna fast page changes me old response overwrite kar sakta hai.
    const controller = new AbortController();

    async function loadJobs() {
      setLoading(true);
      setErrorMsg(null);

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_SIZE),
        });

        if (search.trim()) {
          params.set("search", search.trim());
        }

        const res = await fetch(`${API_BASE}/api/jobs?${params.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Server ne ${res.status} bheja`);
        }

        const json: ApiResponse = await res.json();
        setData(json);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setErrorMsg("Jobs load nahi ho paaye. Backend chal raha hai na?");
        }
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
    return () => controller.abort();
  }, [page, search, retryTick]);

  const totalPages = data?.total_pages ?? 1;
  const isFirstPage = page === 1;
  const isLastPage = page >= totalPages;

  const handleSearch = (value: string) => {
    // Nayi search ke saath hamesha first page par jaana safe hai.
    setSearch(value);
    setPage(1);
  };

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 md:py-14">
      {/* Header simple rakha hai - actual job board jaisa, unnecessary marketing copy nahi. */}
      <header className="mb-8 border-b border-ink-200 pb-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-violet-700">
              WORKBOARD / JOBS
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink-950 md:text-4xl">
              Find your next role.
            </h1>
            <p className="mt-2 text-sm text-ink-500">
              Software roles, engineering teams, and locations.
            </p>
          </div>

          <div className="rounded-md border border-ink-200 bg-white px-4 py-3 text-left md:text-right">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-400">
              Listings
            </p>
            <p className="mt-0.5 text-xl font-semibold text-ink-900">
              {data?.total ?? "—"}
            </p>
          </div>
        </div>
      </header>

      {/* Search backend ko bhej rahe hain, isliye result count bhi filtered data ka milega. */}
      <div className="mb-7 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search jobs</span>
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <input
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search by role, company, location..."
            className="h-12 w-full rounded-md border border-ink-200 bg-white pl-11 pr-4 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </label>
        {search && (
          <button
            onClick={() => handleSearch("")}
            className="h-12 rounded-md border border-ink-200 bg-white px-5 text-sm text-ink-600 transition hover:border-violet-300 hover:text-violet-700"
          >
            Clear
          </button>
        )}
      </div>

      {errorMsg && !loading && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-5 py-4">
          <p className="font-mono text-[11px] font-bold tracking-widest text-red-700">
            REQUEST FAILED
          </p>
          <p className="mt-1 text-sm text-red-800">{errorMsg}</p>
          <button
            onClick={() => setRetryTick((tick) => tick + 1)}
            className="mt-3 rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
          >
            Try again
          </button>
        </div>
      )}

      {loading && (
        <div className="overflow-hidden rounded-md border border-ink-200 bg-white">
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <div
              key={index}
              className="h-[118px] animate-pulse border-b border-ink-100 last:border-0"
            >
              <div className="p-5">
                <div className="h-4 w-2/5 rounded bg-ink-100" />
                <div className="mt-3 h-3 w-1/3 rounded bg-ink-100" />
                <div className="mt-5 h-3 w-1/2 rounded bg-ink-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !errorMsg && data && (
        <>
          <div className="mb-3 flex items-center justify-between text-xs text-ink-400">
            <span>
              {data.total === 0
                ? "No matching roles"
                : `Showing ${Math.min((page - 1) * PAGE_SIZE + 1, data.total)}–${Math.min(
                    page * PAGE_SIZE,
                    data.total
                  )} of ${data.total}`}
            </span>
            <span>Page {page} / {totalPages}</span>
          </div>

          <div className="overflow-hidden rounded-md border border-ink-200 bg-white">
            {data.items.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <p className="text-sm font-medium text-ink-800">No roles found.</p>
                <p className="mt-1 text-sm text-ink-400">Try a different role, company, or city.</p>
              </div>
            ) : (
              <ul>
                {data.items.map((job) => (
                  <li
                    key={job.id}
                    className="group border-b border-ink-100 p-5 last:border-0 transition-colors hover:bg-violet-50/40 md:p-6"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-base font-semibold text-ink-950 group-hover:text-violet-800">
                            {job.title}
                          </h2>
                          <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-700">
                            {job.employment_type}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-ink-700">{job.company}</p>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-500">
                          <span>{job.location}</span>
                          <span>{job.experience}</span>
                          <span>{job.salary}</span>
                        </div>
                      </div>

                      <div className="shrink-0 text-left md:text-right">
                        <p className="font-mono text-[11px] text-ink-400">POSTED</p>
                        <p className="mt-1 text-xs text-ink-600">{job.posted}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pagination simple hai, but first/last page ko disable karke edge cases safe hain. */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={isFirstPage}
              className="rounded-md border border-ink-200 bg-white px-4 py-2 text-sm text-ink-700 transition hover:border-violet-300 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Previous
            </button>

            <span className="font-mono text-xs text-ink-500">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={isLastPage}
              className="rounded-md border border-ink-200 bg-white px-4 py-2 text-sm text-ink-700 transition hover:border-violet-300 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next →
            </button>
          </div>

          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-ink-300">
            Paginated from FastAPI
          </p>
        </>
      )}
    </main>
  );
}
