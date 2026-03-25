import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATIENTS, type PatientStatus, type Patient } from '../mock/patients';

type ViewMode = 'grid' | 'list';

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function statusPill(status: PatientStatus) {
  if (status === 'monitoring')
    return { bg: 'color-mix(in srgb, var(--accent) 20%, transparent)', color: 'var(--accent)' };
  if (status === 'critical')
    return { bg: 'color-mix(in srgb, var(--accent) 26%, transparent)', color: 'var(--accent)' };
  return { bg: 'color-mix(in srgb, var(--accent) 14%, transparent)', color: 'var(--accent)' };
}

function ViewToggle({ mode, onChange }: { mode: ViewMode; onChange: (m: ViewMode) => void }) {
  return (
    <div
      className="flex items-center gap-1 rounded-2xl p-1"
      style={{
        border: '1px solid var(--border)',
        background: 'var(--code-bg)',
      }}
    >
      <button
        type="button"
        onClick={() => onChange('grid')}
        className="p-2 rounded-lg transition-colors"
        style={{
          background: mode === 'grid' ? 'var(--accent)' : 'transparent',
          color: mode === 'grid' ? 'white' : 'var(--text)',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-pressed={mode === 'grid'}
        aria-label="Grid view"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3h7v7H3z" />
          <path d="M14 3h7v7h-7z" />
          <path d="M14 14h7v7h-7z" />
          <path d="M3 14h7v7H3z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => onChange('list')}
        className="p-2 rounded-lg transition-colors"
        style={{
          background: mode === 'list' ? 'var(--accent)' : 'transparent',
          color: mode === 'list' ? 'white' : 'var(--text)',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-pressed={mode === 'list'}
        aria-label="List view"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 6h13" />
          <path d="M8 12h13" />
          <path d="M8 18h13" />
          <path d="M3 6h.01" />
          <path d="M3 12h.01" />
          <path d="M3 18h.01" />search
        </svg>
      </button>
    </div>
  );
}

function PatientCard({ patient, onOpen }: { patient: Patient; onOpen: () => void }) {
  const pill = statusPill(patient.status);

  const rows = [
    { label: 'Condition', value: patient.condition },
    { label: 'Doctor', value: patient.doctor },
    { label: 'Room', value: patient.room },
  ] as const;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="card-hover h-full w-full text-left anim-fade flex flex-col rounded-2xl p-5 sm:p-6"
      style={{
        border: '1px solid var(--border)',
        // background: 'var(--code-bg)',
        // boxShadow: 'var(--shadow)',
        cursor: 'pointer',
      }}
    >
      {/* Header: avatar + identity (premium SaaS card header) */}
      <div className="mb-5 flex items-start gap-4">
        <div
          className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full text-[15px] font-bold tracking-tight"
          style={{
            background: 'color-mix(in srgb, var(--accent) 16%, transparent)',
            color: 'var(--accent)',
          }}
        >
          {initials(patient.name)}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div
            className="truncate text-lg font-bold leading-tight"
            style={{ color: 'var(--text-h)' }}
          >
            {patient.name}
          </div>
          <div
            className="mt-1 truncate text-sm leading-snug"
            style={{ color: 'color-mix(in srgb, var(--text) 82%, transparent)' }}
          >
            {patient.id} · {patient.age}
            {patient.gender === 'Male' ? 'M' : 'F'}
          </div>
        </div>
      </div>

      {/* Body: label / value rows with clear gutter (matches reference layout) */}
      <div className="flex min-h-[100px] flex-1 flex-col gap-3.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4">
            <span
              className="flex-shrink-0 text-sm leading-snug"
              style={{ color: 'color-mix(in srgb, var(--text) 82%, transparent)' }}
            >
              {row.label}
            </span>
            <span
              className="min-w-0 max-w-[58%] truncate text-right text-sm font-semibold leading-snug"
              style={{ color: 'var(--text-h)' }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Footer: divider + status + last visit */}
      <div
        className="mt-5 flex items-center justify-between gap-3 border-t pt-4"
        style={{ borderColor: 'var(--border)' }}
      >
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
          style={{ background: pill.bg, color: pill.color }}
        >
          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
        </span>
        <span
          className="flex-shrink-0 text-xs tabular-nums"
          style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
        >
          Last:{' '}
          {new Date(patient.lastVisit).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
    </button>
  );
}

export default function PatientsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PATIENTS;

    return PATIENTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.condition.toLowerCase().includes(q) ||
        p.doctor.toLowerCase().includes(q) ||
        p.room.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="max-w-7xl">
      <div className="mb-8 flex flex-col gap-5 anim-fade sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: 'var(--text-h)' }}
          >
            Patient Directory
          </h1>
          <p
            className="mt-1.5 text-sm"
            style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
          >
            {filtered.length} active patients
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, id, condition, doctor..."
            className="w-full rounded-2xl px-4 py-3 text-sm outline-none transition-all sm:w-[min(100%,22rem)] lg:w-80"
            style={{
              border: '1px solid var(--border)',
              background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
              // color: 'var(--text-h)',
            }}
            aria-label="Search patients"
          />
          <ViewToggle mode={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filtered.map((p, i) => (
            <div key={p.id} className={`flex min-h-0 ${i < 6 ? `anim-fade stagger-${i + 1}` : ''}`}>
              <PatientCard patient={p} onOpen={() => navigate(`/patients/${p.id}`)} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="overflow-hidden rounded-2xl"
          style={{
            border: '1px solid var(--border)',
            // background: 'var(--code-bg)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div
            className="grid grid-cols-12 gap-4 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider"
            style={{
              color: 'color-mix(in srgb, var(--text) 75%, transparent)',
              borderBottom: '1px solid var(--border)',
              background: 'color-mix(in srgb, var(--bg) 65%, var(--code-bg))',
            }}
          >
            <div className="col-span-4">Patient</div>
            <div className="col-span-2 hidden sm:block">Condition</div>
            <div className="col-span-2 hidden md:block">Doctor</div>
            <div className="col-span-1 hidden lg:block">Room</div>
            <div className="col-span-2 hidden md:block">Last Visit</div>
            <div className="ol-span-2 hidden md:block">Status</div>
          </div>

          <div>
            {filtered.map((p, i) => {
              const pill = statusPill(p.status);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => navigate(`/patients/${p.id}`)}
                  className={`patients-list-row w-full grid grid-cols-12 items-center gap-4 px-5 py-4 text-left ${
                    i < 6 ? `anim-fade stagger-${i + 1}` : ''
                  }`}
                  style={{
                    border: 'none',
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : undefined,
                    cursor: 'pointer',
                    background: 'transparent',
                  }}
                >
                  <div className="col-span-4 flex items-center gap-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-medium flex-shrink-0"
                      style={{
                        background: 'color-mix(in srgb, var(--accent) 18%, transparent)',
                        color: 'var(--accent)',
                      }}
                    >
                      {initials(p.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium truncate" style={{ color: 'var(--text-h)' }}>
                        {p.name}
                      </div>
                      <div
                        className="truncate text-xs mt-0.5"
                        style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
                      >
                        {p.id} · {p.age}
                        {p.gender === 'Male' ? 'M' : 'F'}
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-span-2 hidden sm:block truncate"
                    style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
                  >
                    {p.condition}
                  </div>
                  <div
                    className="col-span-2 hidden md:block truncate"
                    style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
                  >
                    {p.doctor}
                  </div>
                  <div
                    className="col-span-1 hidden lg:block"
                    style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
                  >
                    {p.room}
                  </div>
                  <div
                    className="col-span-2 hidden md:block"
                    style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
                  >
                    {new Date(p.lastVisit).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="">
                    <span
                      className="px-2.5 py-1 rounded-full font-medium text-xs"
                      style={{ background: pill.bg, color: pill.color }}
                    >
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
