import { 
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Tournament, Match, Prediction, Player, UserScore } from '../types';

// Tournaments
export async function getAllTournaments() {
  const tournamentsRef = collection(db, 'tournaments');
  const q = query(tournamentsRef, orderBy('startDate', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Tournament[];
}

export async function getActiveTournament() {
  const tournamentsRef = collection(db, 'tournaments');
  const q = query(tournamentsRef, where('isActive', '==', true), limit(1));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return null;
  
  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data()
  } as Tournament;
}

export async function getTournamentById(tournamentId: string) {
  const docRef = doc(db, 'tournaments', tournamentId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;
  
  return {
    id: docSnap.id,
    ...docSnap.data()
  } as Tournament;
}

// Matches
export async function getMatchesByTournament(tournamentId: string) {
  const matchesRef = collection(db, 'matches');
  const q = query(matchesRef, where('tournamentId', '==', tournamentId), orderBy('startTime'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Match[];
}

export async function getMatch(matchId: string) {
  const docRef = doc(db, 'matches', matchId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;
  
  return {
    id: docSnap.id,
    ...docSnap.data()
  } as Match;
}

// Predictions
export async function createPrediction(prediction: Omit<Prediction, 'id' | 'timestamp' | 'points' | 'isCorrect'>) {
  const predictionData = {
    ...prediction,
    timestamp: serverTimestamp(),
    points: 0,
  };
  
  const docRef = await addDoc(collection(db, 'predictions'), predictionData);
  return { id: docRef.id, ...predictionData };
}

export async function getUserPredictions(userId: string, tournamentId?: string) {
  let predictionQuery;
  const predictionsRef = collection(db, 'predictions');
  
  if (tournamentId) {
    // First get all matches for the tournament
    const matches = await getMatchesByTournament(tournamentId);
    const matchIds = matches.map(match => match.id);
    
    // Then query predictions for these matches by this user
    predictionQuery = query(
      predictionsRef, 
      where('userId', '==', userId),
      where('matchId', 'in', matchIds)
    );
  } else {
    predictionQuery = query(
      predictionsRef,
      where('userId', '==', userId)
    );
  }
  
  const snapshot = await getDocs(predictionQuery);
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Prediction[];
}

// Leaderboard
export async function getLeaderboard(tournamentId?: string, limit = 20) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, orderBy('points', 'desc'), limit(limit));
  const snapshot = await getDocs(q);
  
  const leaderboard = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      userId: doc.id,
      displayName: data.displayName,
      photoURL: data.photoURL,
      points: data.points || 0,
      correctPredictions: data.correctPredictions || 0,
      totalPredictions: data.totalPredictions || 0
    } as UserScore;
  });
  
  return leaderboard;
} 