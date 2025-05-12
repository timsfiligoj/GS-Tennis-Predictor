import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import MatchCard from '../../components/MatchCard';
import { useAuthContext } from '../../lib/AuthContext';
import { getUserPredictions } from '../../services/firestore';
import { Round } from '../../types';

export default function Predictions() {
  const { user, loading } = useAuthContext();
  const [predictions, setPredictions] = React.useState([]);
  const [loadingPredictions, setLoadingPredictions] = React.useState(true);
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      redirect('/auth/login');
    }
  }, [user, loading]);
  
  // Load user predictions
  React.useEffect(() => {
    const fetchPredictions = async () => {
      if (!user) return;
      
      try {
        setLoadingPredictions(true);
        const userPredictions = await getUserPredictions(user.uid);
        setPredictions(userPredictions);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoadingPredictions(false);
      }
    };
    
    if (user) {
      fetchPredictions();
    }
  }, [user]);
  
  // For demo purposes, let's create some mock predictions
  const mockPredictions = [
    {
      id: 'pred-1',
      userId: 'user123',
      matchId: 'match-1',
      predictedWinner: 'novak-djokovic',
      timestamp: '2023-07-09T10:23:45Z',
      points: 10,
      isCorrect: true,
      match: {
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
      }
    },
    {
      id: 'pred-2',
      userId: 'user123',
      matchId: 'match-2',
      predictedWinner: 'roman-safiullin',
      timestamp: '2023-07-09T11:05:30Z',
      points: 0,
      isCorrect: false,
      match: {
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
      }
    },
    {
      id: 'pred-3',
      userId: 'user123',
      matchId: 'match-3',
      predictedWinner: 'novak-djokovic',
      timestamp: '2023-07-12T09:45:15Z',
      points: 0,
      match: {
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
    }
  ];
  
  if (loading || loadingPredictions) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Predictions</h1>
        <p className="text-gray-600">
          Track all your Grand Slam match predictions and see how well you're doing.
        </p>
      </div>
      
      {/* Stats summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 mb-1">{mockPredictions.length}</div>
            <div className="text-sm text-gray-500">Total Predictions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {mockPredictions.filter(p => p.isCorrect).length}
            </div>
            <div className="text-sm text-gray-500">Correct Predictions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 mb-1">
              {mockPredictions.reduce((total, pred) => total + (pred.points || 0), 0)}
            </div>
            <div className="text-sm text-gray-500">Total Points</div>
          </div>
        </div>
      </div>
      
      {/* Predictions list */}
      {mockPredictions.length > 0 ? (
        <div className="space-y-6">
          {mockPredictions.map((prediction) => (
            <div key={prediction.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/tournaments/${prediction.match.tournamentId}`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Wimbledon 2023
                  </Link>
                  <span className="text-xs text-gray-500">
                    Predicted on {new Date(prediction.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <MatchCard 
                match={prediction.match}
                userPrediction={{
                  predictedWinner: prediction.predictedWinner,
                  isCorrect: prediction.isCorrect,
                  points: prediction.points
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-8 rounded-md text-center">
          <p className="mb-4">You haven't made any predictions yet.</p>
          <Link
            href="/tournaments"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Browse Tournaments
          </Link>
        </div>
      )}
    </div>
  );
} 