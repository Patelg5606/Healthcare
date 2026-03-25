import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { departmentLoad, kpis } from '../mock/analytics';
import { PATIENTS, type PatientStatus } from '../mock/patients';
import { useNotificationStore } from '../stores/notifications';

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function statusPill(status: PatientStatus) {
  if (status === 'monitoring') {
    return {
      bg: 'color-mix(in srgb, var(--accent) 20%, transparent)',
      color: 'var(--accent)',
    };
  }

  if (status === 'critical') {
    return {
      bg: 'color-mix(in srgb, var(--accent) 26%, transparent)',
      color: 'var(--accent)',
    };
  }

  return {
    bg: 'color-mix(in srgb, var(--accent) 14%, transparent)',
    color: 'var(--accent)',
  };
}

function KpiIcon({ icon }: { icon: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (icon) {
    case 'users':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'bed-double':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3 7h18v10H3V7z" />
          <path d="M3 17v3" />
          <path d="M21 17v3" />
          <path d="M7 7V4h2v3" />
          <path d="M17 7V4h2v3" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const showNotification = useNotificationStore((s) => s.showNotification);

  useEffect(() => {
    // Design-time preview notifications (mocked)
    const t1 = window.setTimeout(() => {
      showNotification({
        title: 'Patient Alert',
        body: 'Robert Okafor (Room 401A) — elevated heart rate',
        type: 'critical',
      });
    }, 2500);

    const t2 = window.setTimeout(() => {
      showNotification({
        title: 'Appointment Reminder',
        body: 'Dr. Lin has 3 upcoming appointments this afternoon',
        type: 'info',
      });
    }, 6500);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [showNotification]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-7xl anim-fade">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-h)' }}>
          Welcome back, Doctor
        </h1>
        <p style={{ color: 'color-mix(in srgb, var(--text) 82%, transparent)' }} className="mt-1">
          Here’s your clinical overview for today, {today}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {kpis.map((k, i) => (
          <div
            key={k.label}
            className={`rounded-xl p-5 card-hover anim-fade stagger-${i + 1}`}
            style={{
              border: '1px solid var(--border)',
              background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: 40,
                  height: 40,
                  background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                  color: 'var(--accent)',
                }}
                aria-hidden="true"
              >
                <KpiIcon icon={k.icon} />
              </div>

              <span
                className="rounded-full px-2 py-0.5 text-xs font-medium"
                style={{
                  background: 'color-mix(in srgb, var(--accent) 14%, transparent)',
                  color: 'var(--accent)',
                }}
              >
                {k.change}
              </span>
            </div>

            <div className="font-bold" style={{ fontSize: 20, color: 'var(--text-h)' }}>
              {k.value}
            </div>
            <div
              className="text-sm mt-1"
              style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
            >
              {k.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div
          className="lg:col-span-3 rounded-xl p-6 card-hover anim-fade stagger-5"
          style={{
            border: '1px solid var(--border)',
            background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold" style={{ color: 'var(--text-h)' }}>
              Recent Patients
            </h2>
            <button
              type="button"
              onClick={() => navigate('/patients')}
              className="text-sm font-medium hover:underline"
              style={{
                color: 'var(--accent)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {PATIENTS.slice(0, 4).map((p, idx) => {
              const pill = statusPill(p.status);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => navigate(`/patients/${p.id}`)}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg anim-fade stagger-${Math.min(idx + 1, 6)}`}
                  style={{ border: 'none', cursor: 'pointer', background: 'transparent' }}
                >
                  <div
                    className="flex items-center justify-center rounded-full font-semibold flex-shrink-0"
                    style={{
                      width: 44,
                      height: 44,
                      background: 'color-mix(in srgb, var(--accent) 18%, transparent)',
                      color: 'var(--accent)',
                    }}
                  >
                    {initials(p.name)}
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-medium truncate" style={{ color: 'var(--text-h)' }}>
                      {p.name}
                    </div>
                    <div
                      className="truncate text-sm mt-0.5"
                      style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
                    >
                      {p.condition} · Room {p.room}
                    </div>
                  </div>

                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap"
                    style={{ background: pill.bg, color: pill.color }}
                  >
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div
            className="rounded-xl p-6 card-hover anim-fade stagger-5"
            style={{
              border: '1px solid var(--border)',
              background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
            }}
          >
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-h)' }}>
              Department Load
            </h3>
            <div className="space-y-3">
              {departmentLoad.map((d) => {
                const max = 160;
                const pct = Math.min(100, Math.round((d.patients / max) * 100));
                return (
                  <div key={d.dept}>
                    <div
                      className="flex justify-between mb-1 text-sm"
                      style={{ color: 'color-mix(in srgb, var(--text) 80%, transparent)' }}
                    >
                      <span>{d.dept}</span>
                      <span style={{ color: 'var(--text-h)', fontWeight: 600 }}>{d.patients}</span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: 'color-mix(in srgb, var(--border) 55%, transparent)' }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: d.color,
                          transition: 'width 0.8s',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-xl p-6 card-hover anim-fade stagger-6"
            style={{
              border: '1px solid var(--border)',
              background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
            }}
          >
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-h)' }}>
              Alerts
            </h3>
            <div className="space-y-2">
              {[
                { title: 'R. Okafor', body: 'Elevated heart rate', type: 'critical' as const },
                { title: 'Lab Queue', body: '2 results pending review', type: 'warning' as const },
                {
                  title: 'All Systems',
                  body: 'Operational health signals',
                  type: 'success' as const,
                },
              ].map((a, i) => (
                <div
                  key={a.title}
                  className={`flex items-center gap-3 p-2.5 rounded-lg anim-slide-down`}
                  style={{
                    background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--border) 60%, transparent)',
                    animationDelay: `${i * 0.06}s`,
                  }}
                >
                  <div
                    className="status-pulse"
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 6,
                      background: 'color-mix(in srgb, var(--accent) 18%, transparent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                    aria-hidden="true"
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-h)', fontSize: 13 }}>
                      {a.title}
                    </div>
                    <div
                      style={{
                        color: 'color-mix(in srgb, var(--text) 80%, transparent)',
                        fontSize: 12,
                      }}
                    >
                      {a.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
