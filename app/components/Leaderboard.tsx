import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserScore } from '../types';
import { getLeaderboard } from '../services/firestore';

interface LeaderboardProps {
  tournamentId?: string;
  limit?: number;
}

export default function Leaderboard({ tournamentId, limit = 10 }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await getLeaderboard(tournamentId, limit);
        setLeaderboard(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [tournamentId, limit]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        {error}
      </div>
    );
  }
  
  if (leaderboard.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-8 rounded-md text-center">
        No data available yet. Make predictions to appear on the leaderboard!
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-indigo-600 text-white px-6 py-4">
        <h3 className="text-lg font-semibold">Leaderboard</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {leaderboard.map((user, index) => (
          <div key={user.userId} className="flex items-center px-6 py-4">
            <div className="flex-shrink-0 mr-4 w-8 text-center">
              <span className={`font-bold ${index < 3 ? 'text-indigo-600' : 'text-gray-600'}`}>
                {index + 1}
              </span>
            </div>
            
            <div className="flex-shrink-0 mr-4">
              {user.photoURL ? (
                <Image 
                  src={user.photoURL} 
                  alt={user.displayName} 
                  width={40} 
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-500 font-semibold">
                    {user.displayName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{user.displayName}</h4>
              <p className="text-sm text-gray-500">
                {user.correctPredictions} correct of {user.totalPredictions} predictions
              </p>
            </div>
            
            <div className="flex-shrink-0 ml-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {user.points} pts
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 