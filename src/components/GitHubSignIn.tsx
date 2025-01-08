import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, githubProvider } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const GitHubSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGitHubSignIn = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await signInWithPopup(auth, githubProvider);
    } catch (error: any) {
      console.error('Error signing in with GitHub:', error);
      
      let message = 'Failed to sign in with GitHub. Please try again.';
      if (error.code === 'auth/account-exists-with-different-credential') {
        message = 'An account already exists with this email. Please sign in with your existing account.';
      }
      
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleGitHubSignIn}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2"
    >
      <Github className="w-5 h-5" />
      {loading ? 'Signing in...' : 'Continue with GitHub'}
    </Button>
  );
};
