import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Tournament } from '../types';

interface TournamentCardProps {
  tournament: Tournament;
}

export default function TournamentCard({ tournament }: TournamentCardProps) {
  const startDate = dayjs(tournament.startDate).format('MMM D, YYYY');
  const endDate = dayjs(tournament.endDate).format('MMM D, YYYY');
  
  // Helper function to get the tournament logo
  const getTournamentLogo = (name: string) => {
    switch (name) {
      case 'Australian Open':
        return '/images/australian-open.png';
      case 'French Open':
        return '/images/french-open.png';
      case 'Wimbledon':
        return '/images/wimbledon.png';
      case 'US Open':
        return '/images/us-open.png';
      default:
        return '/images/tennis-ball.png';
    }
  };
  
  // Helper function to get the tournament color
  const getTournamentColor = (name: string) => {
    switch (name) {
      case 'Australian Open':
        return 'bg-blue-100 border-blue-500';
      case 'French Open':
        return 'bg-red-100 border-red-500';
      case 'Wimbledon':
        return 'bg-green-100 border-green-500';
      case 'US Open':
        return 'bg-indigo-100 border-indigo-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };
  
  return (
    <div className={`rounded-lg shadow-md overflow-hidden border-l-4 ${getTournamentColor(tournament.name)}`}>
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 mr-4">
            <Image 
              src={getTournamentLogo(tournament.name)} 
              alt={tournament.name} 
              width={48} 
              height={48}
              className="rounded-full"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {tournament.name} {tournament.year}
            </h3>
            <p className="text-sm text-gray-600">
              {startDate} - {endDate}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tournament.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {tournament.isActive ? 'Ongoing' : 'Completed'}
            </span>
          </div>
          <Link
            href={`/tournaments/${tournament.id}`}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {tournament.isActive ? 'Make Predictions' : 'View Results'}
          </Link>
        </div>
      </div>
    </div>
  );
} 