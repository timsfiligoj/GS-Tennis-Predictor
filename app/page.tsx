import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TournamentCard from './components/TournamentCard';
import Leaderboard from './components/Leaderboard';

// Server component to fetch active tournament
async function ActiveTournament() {
  // In a real app, this would fetch from your Firestore database
  // For demo purposes, we're returning mock data
  const activeTournament = {
    id: 'wimbledon-2023',
    name: 'Wimbledon',
    startDate: '2023-07-03',
    endDate: '2023-07-16',
    isActive: true,
    year: 2023
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Active Tournament</h2>
      <TournamentCard tournament={activeTournament} />
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl mb-10">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-16 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Predict. Win. Celebrate.
            </h1>
            <p className="text-xl mb-6">
              Make your predictions for Grand Slam tennis matches and compete with friends for the highest score.
            </p>
            <Link
              href="/tournaments"
              className="inline-block bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-indigo-50 transition-colors"
            >
              Start Predicting
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Loading active tournament...</div>}>
            <ActiveTournament />
          </Suspense>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">How it Works</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-indigo-600">1</span>
                  </div>
                  <h3 className="font-medium mb-2">Sign In</h3>
                  <p className="text-sm text-gray-600">Create an account or sign in with Google to start making predictions.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-indigo-600">2</span>
                  </div>
                  <h3 className="font-medium mb-2">Predict Matches</h3>
                  <p className="text-sm text-gray-600">Select winners for upcoming Grand Slam matches before they begin.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-indigo-600">3</span>
                  </div>
                  <h3 className="font-medium mb-2">Score Points</h3>
                  <p className="text-sm text-gray-600">Earn points for correct predictions and climb the leaderboard!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Predictors</h2>
          <Leaderboard limit={5} />
        </div>
      </div>
    </div>
  );
} 