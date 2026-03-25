import { useNotificationStore } from '../stores/notifications';

export default function NotificationsPage() {
  const showNotification = useNotificationStore((s) => s.showNotification);

  return (
    <div className="max-w-3xl anim-fade">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-h)' }}>
          Notifications
        </h1>
        <p style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }} className="mt-1">
          Design preview of in-app notifications (mocked).
        </p>
      </div>

      <div
        className="rounded-xl p-6"
        style={{
          border: '1px solid var(--border)',
          background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className="inline-flex items-center justify-center rounded-md"
            style={{
              width: 34,
              height: 34,
              background: 'color-mix(in srgb, var(--accent) 14%, transparent)',
              color: 'var(--accent)',
            }}
            aria-hidden="true"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </span>
          <div>
            <div style={{ color: 'var(--text-h)', fontWeight: 700 }}>In-app preview</div>
            <div
              style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)', fontSize: 13 }}
            >
              Toast tray uses the same visual system across the app.
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            showNotification({
              title: 'Test Notification',
              body: 'Design-only toast. Firebase + service-worker comes in Phase 3/7.',
              type: 'info',
              ttlMs: 5500,
            })
          }
          className="px-4 py-2.5 rounded-xl font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Show test toast
        </button>

        <div className="mt-5 space-y-2">
          <div
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{
              background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
              border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
            }}
          >
            <span
              className="inline-flex items-center justify-center"
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                background: 'color-mix(in srgb, var(--accent) 16%, transparent)',
                color: 'var(--accent)',
              }}
              aria-hidden="true"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              </svg>
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: 'var(--text-h)', fontWeight: 700 }}>Theme-safe styles</div>
              <div
                style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)', fontSize: 13 }}
              >
                Toasts primarily use `var(--accent)` so your theme colors remain consistent.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
