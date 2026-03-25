import DashboardLayout from './dashboard/DashboardLayout';

export default function AppLayout() {
  return (
    <div>
      {/*
        Kept AppLayout as the top-level layout wrapper so route wiring stays stable.
        The real dashboard shell lives in src/layouts/dashboard.
      */}
      <DashboardLayout />
    </div>
  );
}
