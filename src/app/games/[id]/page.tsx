import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getGame, getGames } from '@/lib/games-service';
import type { GameCategory } from '@/types';
import GameDetailsClient from './game-details-client';



export async function generateStaticParams() {
  try {
    const games = await getGames();
    if (!games || games.length === 0) {
        // Return some default game IDs for build
        return [
          { id: 'pubg' },
          { id: 'freefire' },
          { id: 'valorant' }
        ];
    }
    return games.map((game) => ({
        id: game.id,
    }));
  } catch (error) {
    console.error("Failed to generate static params for games:", error);
    // Return some default game IDs for build
    return [
      { id: 'pubg' },
      { id: 'freefire' },
      { id: 'valorant' }
    ];
  }
}

export default function GameDetailsPage() {
    return <GameDetailsClient />;
}
