import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

// Load environment variables from the root .env file
dotenv.config({ path: '../../.env' });

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.INTERVIEWER_DB_URL
    }
  }
});

async function main() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create multiple test interviewers
    const interviewers = await Promise.all([
      prisma.interviewer.upsert({
        where: { email: 'interviewer@example.com' },
        update: {},
        create: {
          email: 'interviewer@example.com',
          password: hashedPassword,
        },
      }),
      prisma.interviewer.upsert({
        where: { email: 'john.doe@company.com' },
        update: {},
        create: {
          email: 'john.doe@company.com',
          password: hashedPassword,
        },
      }),
      prisma.interviewer.upsert({
        where: { email: 'sarah.smith@tech.com' },
        update: {},
        create: {
          email: 'sarah.smith@tech.com',
          password: hashedPassword,
        },
      }),
      prisma.interviewer.upsert({
        where: { email: 'mike.wilson@startup.com' },
        update: {},
        create: {
          email: 'mike.wilson@startup.com',
          password: hashedPassword,
        },
      }),
      prisma.interviewer.upsert({
        where: { email: 'emma.davis@enterprise.com' },
        update: {},
        create: {
          email: 'emma.davis@enterprise.com',
          password: hashedPassword,
        },
      })
    ]);

    console.log('Test interviewers created:', interviewers.map(i => ({
      id: i.id,
      email: i.email,
    })));
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 