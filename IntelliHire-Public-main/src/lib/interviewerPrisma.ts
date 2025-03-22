import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const interviewerPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.INTERVIEWER_DB_URL
    }
  }
});

export default interviewerPrisma; 