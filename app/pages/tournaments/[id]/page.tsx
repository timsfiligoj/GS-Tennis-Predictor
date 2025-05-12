import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import MatchCard from '../../../components/MatchCard';
import { GrandSlam, Round } from '../../../types';

// Generate static params for all tournaments at build time
export function generateStaticParams() {
  // In a real app, this would fetch all tournament IDs from your database
  // For now, we'll hardcode the IDs we know about
  return [
    { id: 'wimbledon-2023' },
    // Add other tournament IDs here
  ];
}

// Simulating server-side data fetching
async function getTournament(id: string) {
  // In a real app, this would fetch from your Firestore database
  // For demo purposes, we're returning mock data
  
  // Example tournament data
  const tournaments = {
    'wimbledon-2023': {
      id: 'wimbledon-2023',
      name: GrandSlam.WIMBLEDON,
      startDate: '2023-07-03',
      endDate: '2023-07-16',
      isActive: true,
      year: 2023
    }
  };
  
  if (!tournaments[id]) {
    return null;
  }
  
  return tournaments[id];
}

// Simulating fetching matches for a tournament
async function getMatches(tournamentId: string) {
  // In a real app, this would fetch from your Firestore database
  // For demo purposes, we're returning mock data
  
  // Mock match data for Wimbledon 2023
  if (tournamentId === 'wimbledon-2023') {
    return [
      {
        id: 'match-1',
        tournamentId: 'wimbledon-2023',
        round: Round.QUARTER_FINAL,
        player1: {
          id: 'novak-djokovic',
          name: 'Novak Djokovic',
          country: 'Serbia',
          seeded: 1
        },
        player2: {
          id: 'andrey-rublev',
          name: 'Andrey Rublev',
          country: 'Russia',
          seeded: 7
        },
        completed: true,
        winner: 'novak-djokovic',
        score: '4-6, 6-1, 6-4, 6-3',
        startTime: '2023-07-10T13:00:00Z'
      },
      {
        id: 'match-2',
        tournamentId: 'wimbledon-2023',
        round: Round.QUARTER_FINAL,
        player1: {
          id: 'jannik-sinner',
          name: 'Jannik Sinner',
          country: 'Italy',
          seeded: 8
        },
        player2: {
          id: 'roman-safiullin',
          name: 'Roman Safiullin',
          country: 'Russia'
        },
        completed: true,
        winner: 'jannik-sinner',
        score: '6-4, 3-6, 6-2, 6-2',
        startTime: '2023-07-10T15:30:00Z'
      },
      {
        id: 'match-3',
        tournamentId: 'wimbledon-2023',
        round: Round.SEMI_FINAL,
        player1: {
          id: 'novak-djokovic',
          name: 'Novak Djokovic',
          country: 'Serbia',
          seeded: 1
        },
        player2: {
          id: 'jannik-sinner',
          name: 'Jannik Sinner',
          country: 'Italy',
          seeded: 8
        },
        completed: false,
        startTime: '2023-07-14T13:00:00Z'
      }
    ];
  }
  
  return [];
}

// Component to display matches by round
function MatchesByRound({ matches, round }: { matches: any[], round: Round }) {
  const matchesInRound = matches.filter(m => m.round === round);
  
  if (matchesInRound.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{round}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matchesInRound.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}

// Tournament details component
async function TournamentDetails({ id }: { id: string }) {
  const tournament = await getTournament(id);
  
  if (!tournament) {
    notFound();
  }
  
  const matches = await getMatches(id);
  const startDate = dayjs(tournament.startDate).format('MMM D');
  const endDate = dayjs(tournament.endDate).format('MMM D, YYYY');
  
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:mr-8 mb-4 md:mb-0">
            <Image 
              src={`/images/${tournament.name.toLowerCase().replace(' ', '-')}.png`}
              alt={tournament.name}
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {tournament.name} {tournament.year}
            </h1>
            <p className="text-gray-600 mb-2">
              {startDate} - {endDate}
            </p>
            <div className="mt-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tournament.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {tournament.isActive ? 'Ongoing' : 'Completed'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Matches</h2>
      
      {matches.length > 0 ? (
        <div>
          <MatchesByRound matches={matches} round={Round.FINAL} />
          <MatchesByRound matches={matches} round={Round.SEMI_FINAL} />
          <MatchesByRound matches={matches} round={Round.QUARTER_FINAL} />
          <MatchesByRound matches={matches} round={Round.FOURTH_ROUND} />
          <MatchesByRound matches={matches} round={Round.THIRD_ROUND} />
          <MatchesByRound matches={matches} round={Round.SECOND_ROUND} />
          <MatchesByRound matches={matches} round={Round.FIRST_ROUND} />
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-8 rounded-md text-center">
          No matches available for this tournament yet.
        </div>
      )}
    </div>
  );
}

export default function TournamentPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    }>
      <TournamentDetails id={params.id} />
    </Suspense>
  );
} 