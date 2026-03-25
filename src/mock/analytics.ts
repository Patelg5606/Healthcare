export type MonthlyVisit = { month: string; value: number };
export type DepartmentLoad = { dept: string; patients: number; color: string };

export const monthlyVisits: MonthlyVisit[] = [
  { month: 'Aug', value: 320 },
  { month: 'Sep', value: 410 },
  { month: 'Oct', value: 385 },
  { month: 'Nov', value: 450 },
  { month: 'Dec', value: 520 },
  { month: 'Jan', value: 478 },
];

export const departmentLoad: DepartmentLoad[] = [
  { dept: 'Cardiology', patients: 142, color: '#aa3bff' },
  { dept: 'Neurology', patients: 98, color: '#c084fc' },
  { dept: 'Orthopedics', patients: 115, color: '#aa3bff' },
  { dept: 'Oncology', patients: 87, color: '#c084fc' },
  { dept: 'Pediatrics', patients: 134, color: '#aa3bff' },
];

export const kpis = [
  { label: 'Total Patients', value: '1,247', change: '+12%', icon: 'users', trend: 'up' },
  {
    label: 'Appointments Today',
    value: '38',
    change: '+5',
    icon: 'calendar',
    trend: 'up',
  },
  { label: 'Avg Wait Time', value: '14m', change: '-3m', icon: 'clock', trend: 'down' },
  { label: 'Bed Occupancy', value: '76%', change: '+2%', icon: 'bed-double', trend: 'up' },
];
