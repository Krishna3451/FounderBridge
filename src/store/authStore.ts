import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'candidate' | 'recruiter' | null;

interface AuthStore {
  selectedRole: Role;
  setSelectedRole: (role: Role) => void;
  clearRole: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      selectedRole: null,
      setSelectedRole: (role) => set({ selectedRole: role }),
      clearRole: () => set({ selectedRole: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
