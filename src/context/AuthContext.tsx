import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { selectedRole, clearRole } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user);
      setUser(user);
      setLoading(false);

      if (user) {
        // User is signed in
        if (selectedRole) {
          const redirectPath = selectedRole === 'candidate' ? '/signup/candidate' : '/signup/recruiter';
          console.log('Redirecting to:', redirectPath);
          clearRole(); // Clear the role after using it
          navigate(redirectPath);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, selectedRole, clearRole]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
