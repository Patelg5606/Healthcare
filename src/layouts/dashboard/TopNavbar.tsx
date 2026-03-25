import type { MouseEvent } from 'react';

export default function TopNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  function handleMenuClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onMenuClick();
  }

  return (
    <div className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200/70 bg-white text-slate-700 shadow-sm lg:hidden dark:border-slate-800/70 dark:bg-slate-900 dark:text-slate-200"
          onClick={handleMenuClick}
          aria-label="Open navigation menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M3 5.5H17M3 10H17M3 14.5H17"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold tracking-wide">Admin console</div>
          <div className="truncate text-xs text-slate-600 dark:text-slate-300">
            B2B Healthcare SaaS
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <div className="text-right text-xs text-slate-600 dark:text-slate-300">
              Signed in as
            </div>
            <div className="text-right text-sm font-medium">Admin User</div>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200/70 bg-white px-3 text-sm text-slate-700 shadow-sm dark:border-slate-800/70 dark:bg-slate-900 dark:text-slate-200"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              AU
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
