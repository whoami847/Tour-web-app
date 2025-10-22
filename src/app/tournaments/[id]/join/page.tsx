import { getTournaments } from '@/lib/tournaments-service';
import JoinTournamentClient from './join-client';

// generateStaticParams tells Next.js which paths to pre-render at build time.
export async function generateStaticParams() {
    return [];
}

export default function JoinTournamentPage() {
    return <JoinTournamentClient />;
}
