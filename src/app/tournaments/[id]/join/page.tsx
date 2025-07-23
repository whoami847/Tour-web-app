import { getTournaments } from '@/lib/tournaments-service';
import JoinTournamentClient from './join-client';

export async function generateStaticParams() {
  try {
    const tournaments = await getTournaments();
    if (!tournaments || tournaments.length === 0) {
        return [
          { id: 'sample-tournament' }
        ];
    }
    return tournaments.map((tournament) => ({
        id: tournament.id,
    }));
  } catch (error) {
    console.error("Failed to generate static params for tournaments:", error);
    return [
      { id: 'sample-tournament' }
    ];
  }
}

export default function JoinTournamentPage() {
  return <JoinTournamentClient />;
}
