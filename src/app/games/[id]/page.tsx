import { getGames } from '@/lib/games-service';
import GameDetailsClient from './game-details-client';

export async function generateStaticParams() {
    return [];
}

export default function GameDetailsPage() {
    return <GameDetailsClient />;
}
