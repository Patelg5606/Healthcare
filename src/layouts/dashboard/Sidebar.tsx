import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export default function Sidebar({
  collapsed,
  onNavigate,
  onToggleCollapsed,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  onToggleCollapsed: () => void;
}) {
  const links = [
    {
      to: '/',
      label: 'Dashboard',
      icon: (
        <Icon>
          <path d="M3 13h8V3H3v10Z" />
          <path d="M13 21h8V11h-8v10Z" />
          <path d="M13 3h8v6h-8V3Z" />
          <path d="M3 17h8v4H3v-4Z" />
        </Icon>
      ),
    },
    {
      to: '/patients',
      label: 'Patients',
      icon: (
        <Icon>
          <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3Z" />
          <path d="M8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Z" />
          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
        </Icon>
      ),
    },
    {
      to: '/analytics',
      label: 'Analytics',
      icon: (
        <Icon>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M8 17v-6" />
          <path d="M12 17V9" />
          <path d="M16 17V7" />
        </Icon>
      ),
    },
    {
      to: '/notifications',
      label: 'Notifications',
      icon: (
        <Icon>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </Icon>
      ),
    },
  ] as const;

  return (
    <nav className="flex flex-col gap-2 px-3 py-4">
      {!collapsed ? (
        <div className="px-2 pb-2">
          <div className="text-xs font-semibold tracking-wide text-[color:var(--text)]">MENU</div>
        </div>
      ) : null}

      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.to === '/'}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              'nav-item group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-0',
              collapsed ? 'justify-center gap-0 px-2' : '',
              isActive ? 'active' : 'hover:bg-[color:var(--accent-bg)]/40',
            ].join(' ')
          }
        >
          <span
            aria-hidden="true"
            style={{
              color: 'var(--text-h)',
            }}
          >
            {l.icon}
          </span>
          {!collapsed ? <span className="truncate">{l.label}</span> : null}
        </NavLink>
      ))}

      <div
        className="mt-3 flex flex-col gap-2 pt-3 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="group flex items-center justify-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[color:var(--accent-bg)]/40"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            color: 'var(--text)',
          }}
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
            {collapsed ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
          </svg>
          {!collapsed ? <span>Collapse</span> : null}
        </button>
      </div>
    </nav>
  );
}
