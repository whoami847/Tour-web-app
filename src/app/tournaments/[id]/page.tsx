import { getTournaments } from '@/lib/tournaments-service';
import TournamentDetailsWrapper from './tournament-details-wrapper';

export async function generateStaticParams() {
  return [];
}

export default function TournamentPage() {
  return <TournamentDetailsWrapper />;
}
