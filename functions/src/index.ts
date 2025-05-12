import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

/**
 * Calculate points for predictions when a match is completed
 * This function is triggered when a match document is updated
 */
export const calculatePredictionPoints = functions.firestore
  .document('matches/{matchId}')
  .onUpdate(async (change, context) => {
    const matchId = context.params.matchId;
    const matchBefore = change.before.data();
    const matchAfter = change.after.data();

    // Only process if match has just been completed (wasn't completed before, is completed now)
    if (!matchBefore.completed && matchAfter.completed && matchAfter.winner) {
      console.log(`Match ${matchId} completed. Winner: ${matchAfter.winner}`);
      
      // Find all predictions for this match
      const predictionsSnapshot = await db
        .collection('predictions')
        .where('matchId', '==', matchId)
        .get();
      
      if (predictionsSnapshot.empty) {
        console.log(`No predictions found for match ${matchId}`);
        return null;
      }
      
      // Process each prediction
      const batch = db.batch();
      const pointsToAward = calculatePoints(matchAfter);
      
      const userPoints: { [userId: string]: number } = {};
      
      predictionsSnapshot.forEach(doc => {
        const prediction = doc.data();
        const userId = prediction.userId;
        const predictedWinner = prediction.predictedWinner;
        const isCorrect = predictedWinner === matchAfter.winner;
        
        // Update prediction document
        const predictionRef = db.collection('predictions').doc(doc.id);
        batch.update(predictionRef, {
          isCorrect,
          points: isCorrect ? pointsToAward : 0
        });
        
        // Track points to update user document
        if (isCorrect) {
          userPoints[userId] = (userPoints[userId] || 0) + pointsToAward;
        }
      });
      
      // Update user points
      for (const userId in userPoints) {
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();
        
        if (userDoc.exists) {
          const userData = userDoc.data() || {};
          const currentPoints = userData.points || 0;
          const currentCorrectPredictions = userData.correctPredictions || 0;
          const currentTotalPredictions = userData.totalPredictions || 0;
          
          batch.update(userRef, {
            points: currentPoints + userPoints[userId],
            correctPredictions: currentCorrectPredictions + 1,
            totalPredictions: currentTotalPredictions + 1
          });
        }
      }
      
      // Commit all updates
      await batch.commit();
      console.log(`Processed ${predictionsSnapshot.size} predictions for match ${matchId}`);
      return null;
    }
    
    return null;
  });

/**
 * Calculate points to award based on the round of the match
 */
function calculatePoints(match: any): number {
  // Points increase as tournament progresses
  switch (match.round) {
    case 'First Round':
      return 5;
    case 'Second Round':
      return 10;
    case 'Third Round':
      return 15;
    case 'Fourth Round':
      return 20;
    case 'Quarter Final':
      return 30;
    case 'Semi Final':
      return 50;
    case 'Final':
      return 100;
    default:
      return 5;
  }
} 