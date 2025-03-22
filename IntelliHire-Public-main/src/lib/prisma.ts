import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.CANDIDATE_DB_URL
    }
  }
});

export default prisma; 