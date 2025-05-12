import { Suspense } from 'react';
import Leaderboard from '../../components/Leaderboard';

export default function LeaderboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-gray-600">
          See who's leading the way with their tennis prediction skills.
        </p>
      </div>
      
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      }>
        <div>
          <Leaderboard limit={20} />
        </div>
      </Suspense>
    </div>
  );
} 