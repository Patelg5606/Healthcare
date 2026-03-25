import { create } from 'zustand';

export type NotificationType = 'info' | 'success' | 'warning' | 'critical';

export type Notification = {
  id: number;
  title: string;
  body: string;
  type: NotificationType;
};

type NotificationState = {
  notifications: Notification[];
  showNotification: (input: Omit<Notification, 'id'> & { ttlMs?: number }) => void;
  dismissNotification: (id: number) => void;
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  showNotification: ({ title, body, type, ttlMs = 5000 }) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const notif: Notification = { id, title, body, type };

    set({ notifications: [...get().notifications, notif] });

    window.setTimeout(() => {
      get().dismissNotification(id);
    }, ttlMs);
  },
  dismissNotification: (id) => {
    set({ notifications: get().notifications.filter((n) => n.id !== id) });
  },
}));
