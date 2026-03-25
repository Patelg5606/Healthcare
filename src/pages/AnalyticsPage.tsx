import { useMemo } from 'react';
import { departmentLoad, monthlyVisits } from '../mock/analytics';
import { PATIENTS, type PatientStatus } from '../mock/patients';

function statusColor(status: PatientStatus) {
  // Keep theme stable: derive all status colors from accent with different opacity.
  if (status === 'critical') return 'color-mix(in srgb, var(--accent) 55%, transparent)';
  if (status === 'monitoring') return 'color-mix(in srgb, var(--accent) 35%, transparent)';
  return 'color-mix(in srgb, var(--accent) 25%, transparent)';
}

export default function AnalyticsPage() {
  const maxVal = useMemo(() => Math.max(...monthlyVisits.map((v) => v.value)), []);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of PATIENTS) {
      counts[p.status] = (counts[p.status] || 0) + 1;
    }
    return counts as Record<PatientStatus, number>;
  }, []);

  return (
    <div className="max-w-7xl anim-fade">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-h)' }}>
          Analytics Overview
        </h1>
        <p style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }} className="mt-1">
          Performance metrics and trends across your practice.
        </p>
      </div>

      <div
        className="rounded-xl p-6 mb-6"
        style={{
          border: '1px solid var(--border)',
          background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
        }}
      >
        <h2 className="font-semibold mb-6" style={{ color: 'var(--text-h)' }}>
          Monthly Patient Visits
        </h2>
        <div className="flex items-end gap-3 sm:gap-6" style={{ height: 220 }}>
          {monthlyVisits.map((v, i) => {
            const height = (v.value / maxVal) * 160;
            return (
              <div
                key={v.month}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
              >
                <span className="font-semibold" style={{ color: 'var(--text-h)' }}>
                  {v.value}
                </span>

                <div
                  className="tooltip-wrap w-full flex justify-center"
                  style={{ height }}
                  aria-label={`${v.value} visits in ${v.month}`}
                >
                  <div
                    className={`chart-bar anim-fade stagger-${Math.min(i + 1, 6)} w-full max-w-[48px] rounded-t-lg`}
                    style={{
                      height: '100%',
                      background: `linear-gradient(to top, var(--accent), color-mix(in srgb, var(--accent) 85%, transparent))`,
                    }}
                  />
                  <span
                    className="tooltip-text"
                    style={{
                      background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
                      color: 'var(--text-h)',
                      border: '1px solid var(--border)',
                      padding: '6px 10px',
                    }}
                  >
                    {v.value} visits
                  </span>
                </div>

                <span
                  style={{
                    color: 'color-mix(in srgb, var(--text) 78%, transparent)',
                    fontSize: 12,
                  }}
                >
                  {v.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="rounded-xl p-6"
          style={{
            border: '1px solid var(--border)',
            background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
          }}
        >
          <h2 className="font-semibold mb-5" style={{ color: 'var(--text-h)' }}>
            Department Breakdown
          </h2>
          <div className="space-y-4">
            {departmentLoad.map((d) => {
              const total = departmentLoad.reduce((a, b) => a + b.patients, 0);
              const pct = Math.round((d.patients / total) * 100);
              return (
                <div key={d.dept} className="flex items-center gap-4">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: d.color }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span style={{ color: 'var(--text-h)', fontWeight: 600 }} className="text-sm">
                        {d.dept}
                      </span>
                      <span
                        style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
                        className="text-xs"
                      >
                        {d.patients} pts ({pct}%)
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full"
                      style={{ background: 'color-mix(in srgb, var(--border) 70%, transparent)' }}
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
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="rounded-xl p-6"
          style={{
            border: '1px solid var(--border)',
            background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
          }}
        >
          <h2 className="font-semibold mb-5" style={{ color: 'var(--text-h)' }}>
            Patient Status Distribution
          </h2>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([status, count], idx) => {
              const color = statusColor(status as PatientStatus);
              return (
                <div
                  key={status}
                  className={`flex items-center justify-between p-4 rounded-lg anim-fade ${idx < 6 ? `stagger-${idx + 1}` : ''}`}
                  style={{
                    background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
                    border: `1px solid color-mix(in srgb, var(--border) 80%, transparent)`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                    <span
                      style={{
                        color: 'var(--text-h)',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                    >
                      {status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{ color: 'var(--text-h)', fontWeight: 800 }}>{count}</span>
                    <span
                      style={{
                        color: 'color-mix(in srgb, var(--text) 78%, transparent)',
                        fontSize: 12,
                      }}
                    >
                      patients
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="mt-4 p-4 rounded-lg"
            style={{
              background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
              border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-flex items-center justify-center rounded-md"
                style={{
                  width: 24,
                  height: 24,
                  background: 'color-mix(in srgb, var(--accent) 16%, transparent)',
                }}
                aria-hidden="true"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: 'var(--accent)' }}
                >
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M8 12a4 4 0 0 1 8 0c0 2-1 3-2 4H10c-1-1-2-2-2-4Z" />
                </svg>
              </span>
              <span className="font-medium" style={{ color: 'var(--accent)' }}>
                Insight
              </span>
            </div>
            <p
              style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
              className="text-sm"
            >
              Patient admissions increased this month. Consider reviewing staffing for peak hours
              (9–11 AM).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
