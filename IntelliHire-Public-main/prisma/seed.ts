import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create test interviewer
    const interviewer = await prisma.interviewer.upsert({
      where: { email: 'interviewer@example.com' },
      update: {},
      create: {
        email: 'interviewer@example.com',
        password: hashedPassword,
      },
    });

    console.log('Test interviewer created:', {
      id: interviewer.id,
      email: interviewer.email,
    });
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