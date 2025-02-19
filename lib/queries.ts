// app/actions/saveScore.ts
'use server';

import { prisma } from '../prisma'; // adjust path to your Prisma client instance
import { auth } from '../auth';

export async function saveScore(score: number) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Create a new score entry in the database
  const savedScore = await prisma.score.create({
    data: {
    userId: session.user.id as string,
      score,
    },
  });

  return savedScore;
}



export async function fetchScoresFromDB() {
  const session = await auth();
  if(!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  
  const scores = await prisma.score.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: { createdAt: 'desc' },
  });
  return scores;
}