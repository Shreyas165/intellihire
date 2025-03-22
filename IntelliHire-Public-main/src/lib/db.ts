import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

if (!process.env.CANDIDATE_DB_URL) {
  throw new Error('CANDIDATE_DB_URL environment variable is not set');
}

console.log('Attempting to connect to database...');
console.log('Database URL:', process.env.CANDIDATE_DB_URL.replace(/\/\/[^:]+:[^@]+@/, '//****:****@')); // Log URL without credentials

const pool = new Pool({
  connectionString: process.env.CANDIDATE_DB_URL,
  ssl: {
    rejectUnauthorized: false // Required for NeonDB
  }
});

// Test the connection and check table structure
pool.connect(async (err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  
  if (!client) {
    console.error('No client available');
    return;
  }

  try {
    console.log('Successfully connected to the database');
    
    // Test query to verify connection
    const testResult = await client.query('SELECT NOW()');
    console.log('Database connection test successful:', testResult.rows[0]);
    
    // Drop existing tables if they exist (to ensure clean slate)
    await client.query('DROP TABLE IF EXISTS "Candidate" CASCADE');
    await client.query('DROP TABLE IF EXISTS "Interviewer" CASCADE');
    console.log('Dropped existing tables if they existed');
    
    // Create Candidate table with proper auto-incrementing ID
    console.log('Creating Candidate table...');
    await client.query(`
      CREATE TABLE "Candidate" (
        id BIGSERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        "linkedinUrl" VARCHAR(255),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Candidate table created successfully');

    // Create Interviewer table
    console.log('Creating Interviewer table...');
    await client.query(`
      CREATE TABLE "Interviewer" (
        id BIGSERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Interviewer table created successfully');

    // Verify table structures
    const candidateColumns = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Candidate';
    `);
    console.log('Candidate table structure:', candidateColumns.rows);

    const interviewerColumns = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Interviewer';
    `);
    console.log('Interviewer table structure:', interviewerColumns.rows);

    // Test insert for Candidate table
    try {
      const testEmail = 'test_' + Date.now() + '@example.com';
      const testPassword = await bcrypt.hash('test123', 10);
      const insertResult = await client.query(
        `INSERT INTO "Candidate" (email, password, name)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [testEmail, testPassword, 'Test User']
      );
      console.log('Candidate test insert successful, ID:', insertResult.rows[0].id);
      
      // Clean up test data
      await client.query('DELETE FROM "Candidate" WHERE email = $1', [testEmail]);
      console.log('Candidate test data cleaned up');
    } catch (testError) {
      console.error('Candidate test insert failed:', testError);
      if (testError instanceof Error) {
        console.error('Test error details:', {
          message: testError.message,
          stack: testError.stack,
          code: (testError as any).code,
          detail: (testError as any).detail
        });
      }
    }

    // Create a test interviewer account
    try {
      const interviewerEmail = 'interviewer@example.com';
      const interviewerPassword = await bcrypt.hash('interviewer123', 10);
      const insertResult = await client.query(
        `INSERT INTO "Interviewer" (email, password, name)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [interviewerEmail, interviewerPassword, 'Test Interviewer']
      );
      console.log('Interviewer test account created successfully, ID:', insertResult.rows[0].id);
    } catch (testError) {
      console.error('Interviewer test insert failed:', testError);
      if (testError instanceof Error) {
        console.error('Test error details:', {
          message: testError.message,
          stack: testError.stack,
          code: (testError as any).code,
          detail: (testError as any).detail
        });
      }
    }

  } catch (error) {
    console.error('Error during database setup:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  } finally {
    release();
  }
});

export default pool; 