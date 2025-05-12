// Tournament types
export enum GrandSlam {
  AUSTRALIAN_OPEN = 'Australian Open',
  FRENCH_OPEN = 'French Open',
  WIMBLEDON = 'Wimbledon',
  US_OPEN = 'US Open'
}

export interface Tournament {
  id: string;
  name: GrandSlam;
  startDate: Date | string;
  endDate: Date | string;
  isActive: boolean;
  year: number;
  draw?: Draw;
}

// Player and match types
export interface Player {
  id: string;
  name: string;
  country: string;
  rank?: number;
  seeded?: number;
  imageUrl?: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  round: Round;
  player1: Player;
  player2: Player;
  winner?: string; // player id
  score?: string;
  startTime?: Date | string;
  duration?: number; // in minutes
  court?: string;
  completed: boolean;
}

export enum Round {
  FIRST_ROUND = 'First Round',
  SECOND_ROUND = 'Second Round',
  THIRD_ROUND = 'Third Round',
  FOURTH_ROUND = 'Fourth Round',
  QUARTER_FINAL = 'Quarter Final',
  SEMI_FINAL = 'Semi Final',
  FINAL = 'Final'
}

export interface Draw {
  id: string;
  tournamentId: string;
  matches: Match[];
}

// Prediction types
export interface Prediction {
  id: string;
  userId: string;
  matchId: string;
  predictedWinner: string; // player id
  timestamp: Date | string;
  points: number;
  isCorrect?: boolean;
}

// User types
export interface UserScore {
  userId: string;
  displayName: string;
  photoURL?: string;
  points: number;
  correctPredictions: number;
  totalPredictions: number;
} 