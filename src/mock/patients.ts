export type PatientStatus = 'stable' | 'monitoring' | 'critical';

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  condition: string;
  status: PatientStatus;
  lastVisit: string;
  doctor: string;
  room: string;
  insurance: string;
  phone: string;
  admitDate: string;
  bp: string;
  heartRate: number;
};

export const PATIENTS: Patient[] = [
  {
    id: 'P001',
    name: 'Eleanor Whitfield',
    age: 67,
    gender: 'Female',
    condition: 'Hypertension',
    status: 'stable',
    lastVisit: '2025-01-10',
    doctor: 'Dr. Anand Mehta',
    room: '204A',
    insurance: 'BlueCross PPO',
    phone: '(555) 234-8901',
    admitDate: '2024-12-28',
    bp: '138/88',
    heartRate: 72,
  },
  {
    id: 'P002',
    name: 'Marcus Chen',
    age: 45,
    gender: 'Male',
    condition: 'Type 2 Diabetes',
    status: 'monitoring',
    lastVisit: '2025-01-12',
    doctor: 'Dr. Sarah Lin',
    room: '118B',
    insurance: 'Aetna HMO',
    phone: '(555) 567-3421',
    admitDate: '2025-01-05',
    bp: '126/82',
    heartRate: 78,
  },
  {
    id: 'P003',
    name: 'Priya Sharma',
    age: 34,
    gender: 'Female',
    condition: 'Asthma',
    status: 'stable',
    lastVisit: '2025-01-08',
    doctor: 'Dr. James Wilson',
    room: '310C',
    insurance: 'UnitedHealth',
    phone: '(555) 890-1234',
    admitDate: '2025-01-02',
    bp: '118/76',
    heartRate: 68,
  },
  {
    id: 'P004',
    name: 'Robert Okafor',
    age: 52,
    gender: 'Male',
    condition: 'Cardiac Arrhythmia',
    status: 'critical',
    lastVisit: '2025-01-14',
    doctor: 'Dr. Anand Mehta',
    room: '401A',
    insurance: 'Medicare',
    phone: '(555) 345-6789',
    admitDate: '2025-01-13',
    bp: '152/96',
    heartRate: 110,
  },
  {
    id: 'P005',
    name: 'Sofia Andersson',
    age: 29,
    gender: 'Female',
    condition: 'Migraine',
    status: 'stable',
    lastVisit: '2025-01-06',
    doctor: 'Dr. Sarah Lin',
    room: '205B',
    insurance: 'Cigna PPO',
    phone: '(555) 678-0123',
    admitDate: '2025-01-04',
    bp: '112/72',
    heartRate: 65,
  },
  {
    id: 'P006',
    name: 'David Kamau',
    age: 73,
    gender: 'Male',
    condition: 'COPD',
    status: 'monitoring',
    lastVisit: '2025-01-11',
    doctor: 'Dr. James Wilson',
    room: '315A',
    insurance: 'Medicare',
    phone: '(555) 901-2345',
    admitDate: '2024-12-20',
    bp: '144/90',
    heartRate: 84,
  },
];
