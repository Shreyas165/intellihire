import { Router, RequestHandler } from 'express';
import pool from '../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

// Register endpoint
router.post('/register', (async (req, res) => {
  try {
    const { email, password, name, linkedinUrl } = req.body;
    console.log('Registration attempt for:', email);
    console.log('Request body:', { email, name, linkedinUrl, password: '***' });

    // Validate required fields
    if (!email || !password || !name) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await pool.query(
      'SELECT * FROM "Candidate" WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    console.log('Creating new user...');
    const result = await pool.query(
      `INSERT INTO "Candidate" (email, password, name, "linkedinUrl")
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, name, "linkedinUrl", "createdAt", "updatedAt"`,
      [email, hashedPassword, name, linkedinUrl || null]
    );

    if (!result.rows[0]) {
      console.error('No user was created');
      return res.status(500).json({ message: 'Failed to create user' });
    }

    console.log('User created successfully:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Registration error details:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      if ('code' in error) {
        console.error('Error code:', (error as any).code);
      }
      if ('detail' in error) {
        console.error('Error detail:', (error as any).detail);
      }
      if ('hint' in error) {
        console.error('Error hint:', (error as any).hint);
      }
      if ('where' in error) {
        console.error('Error where:', (error as any).where);
      }
    }
    res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RequestHandler);

// Login endpoint
router.post('/login', (async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Find user
    const result = await pool.query(
      'SELECT * FROM "Candidate" WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.log('Invalid password for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    console.log('Login successful for email:', email);
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Login error details:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}) as RequestHandler);

// Google authentication endpoint
router.post('/google', (async (req, res) => {
  try {
    const { credential } = req.body;

    // Decode the JWT token from Google
    const decoded = JSON.parse(atob(credential.split('.')[1]));
    const { email, name } = decoded;

    // Check if user exists
    const result = await pool.query(
      'SELECT * FROM "Candidate" WHERE email = $1',
      [email]
    );

    let user = result.rows[0];

    if (!user) {
      // Create new user if doesn't exist
      const createResult = await pool.query(
        'INSERT INTO "Candidate" (email, name, password, "linkedinUrl") VALUES ($1, $2, $3, $4) RETURNING id, email, name, "linkedinUrl", "createdAt", "updatedAt"',
        [email, name, '', null]
      );
      user = createResult.rows[0];
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}) as RequestHandler);

// Interviewer Login endpoint
router.post('/interviewer/login', (async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Interviewer login attempt for:', email);

    // Find interviewer
    const result = await pool.query(
      'SELECT * FROM "Interviewer" WHERE email = $1',
      [email]
    );

    const interviewer = result.rows[0];

    if (!interviewer) {
      console.log('Interviewer not found for email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, interviewer.password);

    if (!validPassword) {
      console.log('Invalid password for interviewer:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: interviewer.id, email: interviewer.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Interviewer login successful for:', email);
    res.json({
      id: interviewer.id,
      email: interviewer.email,
      token,
      redirectUrl: 'http://finalcorefeature-production.up.railway.app'
    });
  } catch (error) {
    console.error('Interviewer login error details:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}) as RequestHandler);

export default router; 