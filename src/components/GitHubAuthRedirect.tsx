import { useEffect, useState } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

const GitHubAuthRedirect = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { selectedRole, clearRole } = useAuthStore();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log('Successfully signed in with GitHub:', result.user);
          
          // Get the role and clear it from storage
          const role = selectedRole;
          clearRole();

          // Redirect based on role
          if (role) {
            const redirectPath = role === 'candidate' ? '/signup/candidate' : '/signup/recruiter';
            console.log('Redirecting to:', redirectPath);
            navigate(redirectPath, { replace: true });
          } else {
            console.log('No role found, redirecting to home');
            navigate('/', { replace: true });
          }
        } else {
          console.log('No redirect result, user might have accessed this page directly');
          navigate('/signin', { replace: true });
        }
      } catch (error: any) {
        console.error('Error handling redirect:', error);
        setError(error.message);
        // Wait a bit before redirecting on error
        setTimeout(() => {
          navigate('/signin', { replace: true });
        }, 2000);
      }
    };

    handleRedirect();
  }, [navigate, selectedRole, clearRole]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">Error: {error}</p>
          <p className="text-sm text-gray-600 mt-2">Redirecting to sign in page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

export default GitHubAuthRedirect;
