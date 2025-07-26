import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Github } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

const Auth = () => {
  const { user, signInWithGoogle, signInWithGitHub } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Sign in with your admin account to manage company information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={signInWithGoogle}
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={signInWithGitHub}
          >
            <Github className="w-5 h-5 mr-2" />
            Continue with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;