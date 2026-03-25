import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import NotificationContainer from '../../components/notifications/NotificationContainer';

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <div className="min-h-dvh" style={{ background: 'var(--bg)', color: 'var(--text-h)' }}>
      <div className="flex">
        <aside
          className="hidden flex-col border-r lg:flex transition-[width] duration-300"
          style={{
            borderColor: 'var(--border)',
            background: 'var(--bg)',
            width: sidebarCollapsed ? 72 : 256,
          }}
        >
          <div className="h-14 flex items-center px-4">
            <div className="text-sm font-semibold tracking-wide">B2B SaaS</div>
          </div>
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggleCollapsed={() => setSidebarCollapsed((v) => !v)}
          />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar onMenuClick={() => setMobileOpen(true)} />

          <div className="flex-1 px-4 py-6 lg:px-6">
            <Outlet />
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden" aria-hidden="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            onClick={closeMobile}
            aria-label="Close navigation menu"
          />

          <aside
            className="absolute inset-y-0 left-0 w-72 border-r shadow-xl"
            style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
          >
            <div className="h-14 flex items-center px-4">
              <div className="text-sm font-semibold tracking-wide">B2B SaaS</div>
            </div>
            <Sidebar
              collapsed={sidebarCollapsed}
              onNavigate={closeMobile}
              onToggleCollapsed={() => setSidebarCollapsed((v) => !v)}
            />
          </aside>
        </div>
      ) : null}

      <NotificationContainer />
    </div>
  );
}
