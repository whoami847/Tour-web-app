// This file is now a server component responsible for fetching initial data
// and passing it to a client component for interactive display.

import { getTournaments } from '@/lib/tournaments-service';
import BracketWrapper from './bracket-wrapper';

// generateStaticParams tells Next.js which paths to pre-render at build time.
export async function generateStaticParams() {
  return [];
}

export default function BracketPage() {
  return <BracketWrapper />;
}
