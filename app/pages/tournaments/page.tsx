import { Suspense } from 'react';
import TournamentCard from '../../components/TournamentCard';
import { GrandSlam } from '../../types';

// Server component to fetch tournaments
async function TournamentsList() {
  // In a real app, this would fetch from your Firestore database
  // For demo purposes, we're returning mock data
  const tournaments = [
    {
      id: 'australian-open-2023',
      name: GrandSlam.AUSTRALIAN_OPEN,
      startDate: '2023-01-16',
      endDate: '2023-01-29',
      isActive: false,
      year: 2023
    },
    {
      id: 'french-open-2023',
      name: GrandSlam.FRENCH_OPEN,
      startDate: '2023-05-28',
      endDate: '2023-06-11',
      isActive: false,
      year: 2023
    },
    {
      id: 'wimbledon-2023',
      name: GrandSlam.WIMBLEDON,
      startDate: '2023-07-03',
      endDate: '2023-07-16',
      isActive: true,
      year: 2023
    },
    {
      id: 'us-open-2022',
      name: GrandSlam.US_OPEN,
      startDate: '2022-08-29',
      endDate: '2022-09-11',
      isActive: false,
      year: 2022
    }
  ];
  
  return (
    <div className="space-y-6">
      {tournaments.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
}

export default function Tournaments() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tournaments</h1>
        <p className="text-gray-600">
          View current and past Grand Slam tournaments to make predictions or see results.
        </p>
      </div>
      
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      }>
        <TournamentsList />
      </Suspense>
    </div>
  );
} 