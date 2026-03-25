import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../stores/notifications';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  const navigate = useNavigate();
  const showNotification = useNotificationStore((s) => s.showNotification);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const helperText = useMemo(() => {
    if (!authError) return 'Enter your credentials to access the platform';
    return authError;
  }, [authError]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setAuthError('Please enter your email address.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setAuthError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    setAuthLoading(true);

    // Design-only mock delay (Firebase auth comes in Phase 3)
    window.setTimeout(() => {
      setAuthLoading(false);
      showNotification({
        title: 'Welcome',
        body: `Signed in as ${trimmedEmail}${rememberMe ? ' (remembered)' : ''}`,
        type: 'success',
        ttlMs: 4500,
      });
      navigate('/');
    }, 900);
  }

  return (
    <div className="h-full w-full flex login-pattern" style={{ background: 'var(--bg)' }}>
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, var(--accent) 15%, transparent), color-mix(in srgb, var(--text) 5%, transparent))`,
          }}
        />

        <div className="relative anim-fade text-center max-w-md">
          <div className="mb-8 anim-heartbeat inline-block">
            <svg width="86" height="86" viewBox="0 0 80 80" fill="none">
              <rect width="80" height="80" rx="20" fill="var(--accent)" fillOpacity="0.15" />
              <path
                d="M40 55 L28 42 C24 38 24 32 28 28 C32 24 38 24 40 30 C42 24 48 24 52 28 C56 32 56 38 52 42 Z"
                stroke="var(--accent)"
                strokeWidth="2.5"
                fill="var(--accent)"
                fillOpacity="0.2"
              />
              <path
                d="M33 40 L38 45 L48 35"
                stroke="var(--bg)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="font-display font-bold mb-4" style={{ color: 'var(--text-h)' }}>
            MedPulse
          </h1>
          <p
            style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
            className="leading-relaxed"
          >
            Enterprise-grade healthcare management for modern medical practices.
          </p>

          <div className="mt-10 flex gap-6 justify-center" aria-hidden="true">
            {[
              { value: '1,247', label: 'Active Patients' },
              { value: '99.8%', label: 'Uptime SLA' },
              { value: 'HIPAA', label: 'Compliant' },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`text-center anim-fade ${i === 0 ? 'stagger-2' : i === 1 ? 'stagger-3' : 'stagger-4'}`}
              >
                <div className="font-bold" style={{ color: 'var(--accent)' }}>
                  {s.value}
                </div>
                <div style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm anim-fade">
          <div className="lg:hidden text-center mb-8">
            <div className="mb-3 flex items-center justify-center" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 80 80" fill="none">
                <rect width="80" height="80" rx="20" fill="var(--accent)" fillOpacity="0.15" />
                <path
                  d="M40 55 L28 42 C24 38 24 32 28 28 C32 24 38 24 40 30 C42 24 48 24 52 28 C56 32 56 38 52 42 Z"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  fill="var(--accent)"
                  fillOpacity="0.2"
                />
              </svg>
            </div>
            <h2 className="font-display font-bold" style={{ color: 'var(--text-h)' }}>
              MedPulse
            </h2>
          </div>

          <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-h)' }}>
            Sign in
          </h2>
          <p
            className="mb-8 text-sm"
            style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
          >
            {helperText}
          </p>

          {authError ? (
            <div
              className="mb-4 p-3 rounded-lg flex items-center gap-2 anim-slide-down"
              style={{
                background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                color: 'color-mix(in srgb, var(--accent) 80%, var(--text-h))',
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{authError}</span>
            </div>
          ) : null}

          <form id="login-form" className="space-y-5" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="login-email"
                className="block mb-2 font-medium"
                style={{ color: 'var(--text-h)' }}
              >
                Email address
              </label>
              <div className="relative">
                <span
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'color-mix(in srgb, var(--text) 70%, transparent)',
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
                    <path d="M4 4h16v16H4z" opacity="0" />
                    <path d="M4 4l8 8 8-8" />
                    <path d="M4 20V8" />
                    <path d="M20 20V8" />
                  </svg>
                </span>
                <input
                  id="login-email"
                  type="email"
                  placeholder="doctor@medpulse.io"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl pl-10 pr-4 py-3 outline-none transition-all"
                  style={{
                    border: '1px solid var(--border)',
                    background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
                    color: 'var(--text-h)',
                    fontSize: 14,
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block mb-2 font-medium"
                style={{ color: 'var(--text-h)' }}
              >
                Password
              </label>
              <div className="relative">
                <span
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'color-mix(in srgb, var(--text) 70%, transparent)',
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
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl pl-10 pr-12 py-3 outline-none transition-all"
                  style={{
                    border: '1px solid var(--border)',
                    background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
                    color: 'var(--text-h)',
                    fontSize: 14,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: 'color-mix(in srgb, var(--text) 70%, transparent)',
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" />
                      <circle cx="12" cy="12" r="3" />
                      <path d="M4 4l16 16" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <label
                className="flex items-center gap-2 cursor-pointer"
                style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--accent)' }}
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-sm font-medium hover:underline"
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--accent)',
                }}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-xl font-semibold transition-opacity flex items-center justify-center gap-2"
              style={{
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                opacity: authLoading ? 0.7 : 1,
              }}
            >
              {authLoading ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="animate-spin"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="31.4 31.4"
                    strokeDashoffset="10"
                  />
                </svg>
              ) : null}
              {authLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p
            className="mt-6 text-center text-xs"
            style={{ color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
          >
            Demo: use any email & password (min 6 chars)
          </p>
        </div>
      </div>
    </div>
  );
}
