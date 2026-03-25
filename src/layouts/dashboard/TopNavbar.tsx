import type { MouseEvent } from 'react';

export default function TopNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  function handleMenuClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onMenuClick();
  }

  return (
    <div
      className="sticky top-0 z-10 backdrop-blur"
      style={{
        borderBottom: '1px solid var(--border)',
        background: 'color-mix(in srgb, var(--bg) 86%, transparent)',
      }}
    >
      <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md shadow-sm lg:hidden"
          onClick={handleMenuClick}
          aria-label="Open navigation menu"
          style={{
            border: '1px solid var(--border)',
            background: 'color-mix(in srgb, var(--bg) 90%, transparent)',
            color: 'var(--text-h)',
          }}
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
          <div
            className="truncate text-xs"
            style={{ color: 'color-mix(in srgb, var(--text) 85%, transparent)' }}
          >
            B2B Healthcare SaaS
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <div
              className="text-right text-xs"
              style={{ color: 'color-mix(in srgb, var(--text) 85%, transparent)' }}
            >
              Signed in as
            </div>
            <div className="text-right text-sm font-medium">Admin User</div>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm shadow-sm"
            style={{
              border: '1px solid var(--border)',
              background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
              color: 'var(--text-h)',
            }}
          >
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                background: 'var(--accent-bg)',
                color: 'var(--accent)',
              }}
            >
              AU
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
