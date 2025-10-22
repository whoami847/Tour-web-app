'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthGuardUserProps {
  children: React.ReactNode;
}

export default function AuthGuardUser({ children }: AuthGuardUserProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Define allowed roles for User Panel
  const allowedRoles = ['user', 'player'];

  useEffect(() => {
    if (!loading && profile) {
      if (!allowedRoles.includes(profile.role)) {
        toast({
          title: "Access Denied",
          description: "This app is for regular users only. Please use the Admin app for administrative tasks.",
          variant: "destructive"
        });
      }
    }
  }, [profile, loading, toast]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show login required
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please log in to access the Esports HQ User Panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => router.push('/login')} 
              className="w-full"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access denied for non-user roles
  if (profile && !allowedRoles.includes(profile.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              This app is designed for regular users only. 
              If you're an administrator, please use the Admin Panel app.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p><strong>Your Role:</strong> {profile.role}</p>
              <p><strong>Allowed Roles:</strong> {allowedRoles.join(', ')}</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => router.push('/login')} 
                className="flex-1"
                variant="outline"
              >
                Login as Different User
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                className="flex-1"
              >
                Go to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User has proper access, render children
  return <>{children}</>;
}