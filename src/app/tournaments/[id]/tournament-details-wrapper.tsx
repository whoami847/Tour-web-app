'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { getTournament } from '@/lib/tournaments-service';
import type { Tournament } from '@/types';
import TournamentDetailsClient from '@/components/tournament-details-client';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const TournamentDetailsSkeleton = () => (
  <div className="container mx-auto px-4 py-8 md:pb-8 pb-24 animate-pulse">
    <div className="space-y-8">
      <div className="relative h-64 md:h-80 rounded-lg bg-muted" />
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default function TournamentDetailsWrapper() {
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
          console.error('Error fetching tournament:', error);
          setTournament(null);
        }
        setLoading(false);
      }
    };

    fetchTournament();
  }, [params.id]);

  if (loading) {
    return <TournamentDetailsSkeleton />;
  }

  if (!tournament) {
    notFound();
  }

  return <TournamentDetailsClient initialTournament={tournament} />;
}