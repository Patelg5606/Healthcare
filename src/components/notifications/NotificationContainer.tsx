import { useMemo } from 'react';
import { useNotificationStore } from '../../stores/notifications';

function typeColor(type: 'info' | 'success' | 'warning' | 'critical') {
  // Keep theme colors stable: we primarily use the existing accent color.
  // We only vary opacity to preserve semantic "feel" without palette swapping.
  switch (type) {
    case 'success':
      return 'color-mix(in srgb, var(--accent) 60%, transparent)';
    case 'warning':
      return 'color-mix(in srgb, var(--accent) 75%, transparent)';
    case 'critical':
      return 'var(--accent)';
    case 'info':
    default:
      return 'color-mix(in srgb, var(--accent) 55%, transparent)';
  }
}

export default function NotificationContainer() {
  const notifications = useNotificationStore((s) => s.notifications);
  const dismiss = useNotificationStore((s) => s.dismissNotification);

  const hasNotifications = notifications.length > 0;
  const styles = useMemo(() => {
    return {
      container: {
        pointerEvents: 'none' as const,
        maxWidth: 360,
      },
    };
  }, []);

  return (
    <div
      id="notif-container"
      style={styles.container}
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2"
      aria-live="polite"
      aria-relevant={hasNotifications ? 'additions' : undefined}
    >
      {notifications.map((n, idx) => (
        <div
          key={n.id}
          id={`notif-${n.id}`}
          className={`anim-notif pointer-events-auto`}
          style={{
            background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
            border: '1px solid var(--border)',
            borderLeft: `4px solid ${typeColor(n.type)}`,
            borderRadius: 10,
            padding: '14px 16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            minWidth: 300,
            animationDelay: `${Math.min(idx, 6) * 0.05}s`,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: 'color-mix(in srgb, var(--accent) 18%, transparent)',
              color: 'var(--accent)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 12,
            }}
            aria-hidden="true"
          >
            !
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontWeight: 700,
                color: 'var(--text-h)',
                fontSize: 13,
                marginBottom: 2,
              }}
            >
              {n.title}
            </div>
            <div
              style={{
                color: 'color-mix(in srgb, var(--text) 80%, transparent)',
                fontSize: 12,
                lineHeight: 1.4,
              }}
            >
              {n.body}
            </div>
          </div>

          <button
            type="button"
            onClick={() => dismiss(n.id)}
            aria-label={`Dismiss notification: ${n.title}`}
            style={{
              color: 'color-mix(in srgb, var(--text) 75%, transparent)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 2,
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
