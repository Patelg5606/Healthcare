import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <div className="min-h-dvh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex">
        <aside className="hidden w-64 flex-col border-r border-slate-200/70 lg:flex dark:border-slate-800/70">
          <div className="h-14 flex items-center px-4">
            <div className="text-sm font-semibold tracking-wide">B2B SaaS</div>
          </div>
          <Sidebar />
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

          <aside className="absolute inset-y-0 left-0 w-72 border-r border-slate-200/70 bg-white shadow-xl dark:border-slate-800/70 dark:bg-slate-950">
            <div className="h-14 flex items-center px-4">
              <div className="text-sm font-semibold tracking-wide">B2B SaaS</div>
            </div>
            <Sidebar onNavigate={closeMobile} />
          </aside>
        </div>
      ) : null}
    </div>
  );
}
