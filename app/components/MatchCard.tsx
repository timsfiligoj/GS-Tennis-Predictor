import React, { useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Match } from '../types';
import { createPrediction } from '../services/firestore';
import { useAuthContext } from '../lib/AuthContext';

interface MatchCardProps {
  match: Match;
  userPrediction?: {
    predictedWinner: string;
    isCorrect?: boolean;
    points?: number;
  };
  onPredictionMade?: () => void;
}

export default function MatchCard({ match, userPrediction, onPredictionMade }: MatchCardProps) {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<string | null>(
    userPrediction ? userPrediction.predictedWinner : null
  );
  
  const formatTime = (date: string | Date | undefined) => {
    if (!date) return 'TBD';
    return dayjs(date).format('MMM D, h:mm A');
  };
  
  const handlePrediction = async (playerId: string) => {
    if (!user || loading || match.completed || userPrediction) return;
    
    setLoading(true);
    try {
      await createPrediction({
        userId: user.uid,
        matchId: match.id,
        predictedWinner: playerId
      });
      
      setSelectedWinner(playerId);
      if (onPredictionMade) {
        onPredictionMade();
      }
    } catch (error) {
      console.error('Error making prediction:', error);
      alert('Failed to submit prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const isPlayer1Winner = match.winner === match.player1.id;
  const isPlayer2Winner = match.winner === match.player2.id;
  
  const isUserPredictionCorrect = userPrediction?.isCorrect;
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">{match.round}</span>
          {match.startTime && (
            <span className="text-sm text-gray-500">{formatTime(match.startTime)}</span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {/* Player 1 */}
        <div 
          className={`flex items-center p-3 rounded-lg mb-2 cursor-pointer ${
            match.completed 
              ? isPlayer1Winner 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-gray-50 border border-gray-200'
              : selectedWinner === match.player1.id
                ? 'bg-blue-50 border border-blue-200'
                : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'
          }`}
          onClick={() => !match.completed && !userPrediction && handlePrediction(match.player1.id)}
        >
          <div className="flex-shrink-0 mr-3">
            {match.player1.imageUrl ? (
              <Image 
                src={match.player1.imageUrl} 
                alt={match.player1.name} 
                width={40} 
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 font-semibold">
                  {match.player1.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium">{match.player1.name}</span>
              {match.player1.seeded && (
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {match.player1.seeded}
                </span>
              )}
            </div>
            {match.player1.country && (
              <span className="text-xs text-gray-500">{match.player1.country}</span>
            )}
          </div>
          {userPrediction && userPrediction.predictedWinner === match.player1.id && (
            <div className="ml-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isUserPredictionCorrect 
                  ? 'bg-green-100 text-green-800' 
                  : match.completed 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
              }`}>
                {match.completed 
                  ? isUserPredictionCorrect 
                    ? `+${userPrediction.points} pts` 
                    : 'Wrong'
                  : 'Your Pick'
                }
              </span>
            </div>
          )}
        </div>
        
        {/* vs divider */}
        <div className="flex items-center justify-center my-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-2 text-gray-400 text-sm">vs</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        
        {/* Player 2 */}
        <div 
          className={`flex items-center p-3 rounded-lg cursor-pointer ${
            match.completed 
              ? isPlayer2Winner 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-gray-50 border border-gray-200'
              : selectedWinner === match.player2.id
                ? 'bg-blue-50 border border-blue-200'
                : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'
          }`}
          onClick={() => !match.completed && !userPrediction && handlePrediction(match.player2.id)}
        >
          <div className="flex-shrink-0 mr-3">
            {match.player2.imageUrl ? (
              <Image 
                src={match.player2.imageUrl} 
                alt={match.player2.name} 
                width={40} 
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 font-semibold">
                  {match.player2.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium">{match.player2.name}</span>
              {match.player2.seeded && (
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {match.player2.seeded}
                </span>
              )}
            </div>
            {match.player2.country && (
              <span className="text-xs text-gray-500">{match.player2.country}</span>
            )}
          </div>
          {userPrediction && userPrediction.predictedWinner === match.player2.id && (
            <div className="ml-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isUserPredictionCorrect 
                  ? 'bg-green-100 text-green-800' 
                  : match.completed 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
              }`}>
                {match.completed 
                  ? isUserPredictionCorrect 
                    ? `+${userPrediction.points} pts` 
                    : 'Wrong'
                  : 'Your Pick'
                }
              </span>
            </div>
          )}
        </div>
        
        {/* Match score */}
        {match.completed && match.score && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-600">Final Score: </span>
            <span className="text-sm text-gray-800">{match.score}</span>
          </div>
        )}
      </div>
    </div>
  );
} 