'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Shield, AlertTriangle, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthGuardAdminProps {
  children: React.ReactNode;
}

export default function AuthGuardAdmin({ children }: AuthGuardAdminProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Define allowed roles for Admin Panel
  const allowedRoles = ['admin', 'moderator'];

  useEffect(() => {
    if (!loading && profile) {
      if (!allowedRoles.includes(profile.role)) {
        toast({
          title: "Admin Access Required",
          description: "This app is for administrators only. Please use the User app for regular activities.",
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
            <Crown className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle>Admin Authentication Required</CardTitle>
            <CardDescription>
              Please log in with admin credentials to access the Esports HQ Admin Panel
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

  // Show access denied for non-admin roles
  if (profile && !allowedRoles.includes(profile.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <CardTitle>Administrator Access Required</CardTitle>
            <CardDescription>
              This app is designed for administrators only. 
              If you're a regular user, please use the User Panel app.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p><strong>Your Role:</strong> {profile.role}</p>
              <p><strong>Required Roles:</strong> {allowedRoles.join(', ')}</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => router.push('/login')} 
                className="flex-1"
                variant="outline"
              >
                Login as Admin
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

  // Admin has proper access, render children
  return <>{children}</>;
}