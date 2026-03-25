import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATIENTS, type PatientStatus } from '../mock/patients';
import { useNotificationStore } from '../stores/notifications';

type Note = {
  id: string;
  patientId: string;
  text: string;
  createdAt: string;
};

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

export default function PatientDetailPage() {
  const navigate = useNavigate();
  const { patientId } = useParams<{ patientId: string }>();
  const showNotification = useNotificationStore((s) => s.showNotification);

  const patient = useMemo(() => {
    if (!patientId) return undefined;
    return PATIENTS.find((p) => p.id === patientId);
  }, [patientId]);

  const [notes, setNotes] = useState<Note[]>(() => [
    {
      id: 'n1',
      patientId: 'P001',
      text: 'Patient reports stable symptoms. Continue current medication plan.',
      createdAt: '2025-01-10',
    },
    {
      id: 'n2',
      patientId: 'P004',
      text: 'Heart rate elevated during last observation. Follow up and re-check vitals in 4 hours.',
      createdAt: '2025-01-14',
    },
  ]);
  const [noteText, setNoteText] = useState('');

  function addNote() {
    if (!patient) return;
    const text = noteText.trim();
    if (!text) return;

    const newNote: Note = {
      id: `n-${Date.now()}`,
      patientId: patient.id,
      text,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setNotes((prev) => [newNote, ...prev]);
    setNoteText('');
    showNotification({
      title: 'Note Added',
      body: 'Clinical note saved (mock).',
      type: 'success',
      ttlMs: 3500,
    });
  }

  function deleteNote(noteId: string) {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    showNotification({
      title: 'Note Removed',
      body: 'Clinical note deleted (mock).',
      type: 'info',
      ttlMs: 3000,
    });
  }

  const patientNotes = useMemo(() => {
    if (!patient) return [];
    return notes.filter((n) => n.patientId === patient.id);
  }, [notes, patient]);

  if (!patient) {
    return (
      <div className="max-w-5xl anim-fade">
        <div
          className="rounded-xl p-6"
          style={{
            border: '1px solid var(--border)',
            background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
          }}
        >
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-h)' }}>
            Patient not found
          </h1>
          <p style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }} className="mt-2">
            The patient ID is invalid or the mock data doesn’t include it.
          </p>
          <button
            type="button"
            onClick={() => navigate('/patients')}
            className="mt-5 px-4 py-2.5 rounded-xl font-semibold"
            style={{
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Back to Patients
          </button>
        </div>
      </div>
    );
  }

  const pill = statusPill(patient.status);

  const infoCards = [
    { label: 'Condition', value: patient.condition, icon: 'activity' },
    { label: 'Attending Physician', value: patient.doctor, icon: 'stethoscope' },
    { label: 'Room', value: patient.room, icon: 'door-open' },
    {
      label: 'Admitted',
      value: new Date(patient.admitDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      icon: 'calendar',
    },
    { label: 'Blood Pressure', value: patient.bp, icon: 'heart-pulse' },
    { label: 'Heart Rate', value: `${patient.heartRate} bpm`, icon: 'heart' },
  ];

  return (
    <div className="max-w-5xl mx-auto anim-fade">
      <div className="mb-6">
        <div
          className="flex items-center gap-2"
          style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
        >
          <button
            type="button"
            onClick={() => navigate('/patients')}
            className="flex items-center gap-1 hover:underline"
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--accent)',
              padding: 0,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Patients
          </button>
          <span>/</span>
          <span style={{ color: 'var(--text-h)', fontWeight: 700 }}>{patient.name}</span>
        </div>
      </div>

      <div
        className="rounded-xl p-6 mb-6 anim-fade card-hover"
        style={{
          border: '1px solid var(--border)',
          background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
        }}
      >
        <div className="flex flex-col sm:flex-row gap-6">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center font-bold flex-shrink-0"
            style={{
              background: 'color-mix(in srgb, var(--accent) 18%, transparent)',
              color: 'var(--accent)',
            }}
          >
            {initials(patient.name)}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-h)' }}>
                {patient.name}
              </h1>
              <span
                className="px-3 py-1 rounded-full font-medium text-xs"
                style={{ background: pill.bg, color: pill.color }}
              >
                {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
              </span>
            </div>

            <div
              className="flex flex-wrap gap-x-6 gap-y-2"
              style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
            >
              <span className="flex items-center gap-2" style={{ fontSize: 13 }}>
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 999,
                    background: 'var(--accent)',
                    display: 'inline-block',
                  }}
                />
                {patient.id}
              </span>
              <span className="flex items-center gap-2" style={{ fontSize: 13 }}>
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 999,
                    background: 'var(--accent)',
                    display: 'inline-block',
                  }}
                />
                {patient.age} · {patient.gender}
              </span>
              <span className="flex items-center gap-2" style={{ fontSize: 13 }}>
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 999,
                    background: 'var(--accent)',
                    display: 'inline-block',
                  }}
                />
                {patient.phone}
              </span>
              <span className="flex items-center gap-2" style={{ fontSize: 13 }}>
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 999,
                    background: 'var(--accent)',
                    display: 'inline-block',
                  }}
                />
                {patient.insurance}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {infoCards.map((item, i) => (
          <div
            key={item.label}
            className={`rounded-xl p-4 anim-fade card-hover ${i < 6 ? `stagger-${i + 1}` : ''}`}
            style={{
              border: '1px solid var(--border)',
              background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-flex items-center justify-center rounded-lg"
                style={{
                  width: 28,
                  height: 28,
                  background: 'color-mix(in srgb, var(--accent) 14%, transparent)',
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
                  <path d="M12 2l2 7h7l-5.5 4 2 7-5.5-4-5.5 4 2-7L3 9h7z" />
                </svg>
              </span>
              <span
                style={{
                  color: 'color-mix(in srgb, var(--text) 78%, transparent)',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {item.label}
              </span>
            </div>
            <div className="font-semibold" style={{ color: 'var(--text-h)', fontSize: 14 }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl p-6 anim-fade card-hover"
        style={{
          border: '1px solid var(--border)',
          background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
        }}
      >
        <h2 className="font-semibold mb-4" style={{ color: 'var(--text-h)' }}>
          Clinical Notes
        </h2>

        <div className="flex gap-3 mb-5">
          <label htmlFor="note-input" className="sr-only">
            Add clinical note
          </label>
          <input
            id="note-input"
            type="text"
            placeholder="Add a clinical note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="flex-1 rounded-xl px-4 py-2.5 outline-none transition-all"
            style={{
              border: '1px solid var(--border)',
              background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
              color: 'var(--text-h)',
            }}
          />
          <button
            type="button"
            onClick={addNote}
            className="px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-opacity hover:opacity-90"
            style={{
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Add
          </button>
        </div>

        <div className="space-y-2">
          {patientNotes.length === 0 ? (
            <p
              className="text-center py-6"
              style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
            >
              No clinical notes yet. Add one above.
            </p>
          ) : (
            patientNotes.map((n, idx) => (
              <div
                key={n.id}
                className={`flex items-start gap-3 p-3 rounded-lg anim-fade ${idx < 6 ? `stagger-${Math.min(idx + 1, 6)}` : ''}`}
                style={{
                  background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--border) 60%, transparent)',
                }}
              >
                <div
                  aria-hidden="true"
                  className="flex items-center justify-center"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 8,
                    background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                    color: 'var(--accent)',
                    flexShrink: 0,
                  }}
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
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    style={{
                      color: 'var(--text-h)',
                      fontSize: 13,
                      lineHeight: 1.45,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {n.text}
                  </div>
                  <div
                    style={{
                      color: 'color-mix(in srgb, var(--text) 78%, transparent)',
                      fontSize: 12,
                      marginTop: 4,
                    }}
                  >
                    {n.createdAt}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => deleteNote(n.id)}
                  className="rounded-lg p-1 transition-opacity hover:opacity-90"
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: 'var(--accent)',
                  }}
                  aria-label="Delete note"
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
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4h8v2" />
                    <path d="M6 6l1 16h10l1-16" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
