import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser } from '../models/userModel';
import { random } from '../helpers';


export const register = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;

      if(!username || !email || !password ){
        return res.status(400).json({ message: 'username or password or email is missing' })
      }

      // Check if user with the provided email already exists
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
     const salt = random();
      // Hash the password
      const hashedPassword: string = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = createUser({
        username,
        email,
        authentication : {
            salt: salt,
            password :hashedPassword
        }
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await getUserByEmail( email );
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Verify password
      const isPasswordValid: boolean = await bcrypt.compare(password, user.authentication.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT
      const token: string = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
