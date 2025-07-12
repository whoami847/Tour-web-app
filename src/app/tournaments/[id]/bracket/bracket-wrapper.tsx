'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { getTournament } from '@/lib/tournaments-service';
import type { Tournament } from '@/types';
import BracketClient from '@/components/bracket-client';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const BracketSkeleton = () => (
  <div className="bg-background min-h-screen text-foreground pb-24">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-48 mx-auto" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default function BracketWrapper() {
  const params = useParams<{ id: string }>();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournament = async () => {
      if (params.id) {
        try {
          const data = await getTournament(params.id);
          setTournament(data);
        } catch (error) {
          console.error('Error fetching tournament for bracket:', error);
          setTournament(null);
        }
        setLoading(false);
      }
    };

    fetchTournament();
  }, [params.id]);

  if (loading) {
    return <BracketSkeleton />;
  }

  if (!tournament) {
    notFound();
  }

  return <BracketClient initialTournament={tournament} />;
}