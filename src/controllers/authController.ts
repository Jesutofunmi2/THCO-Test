import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByEmail, createUser } from "../models/userModel";
import { random } from "../helpers";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username or password or email is missing" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    const salt = random();

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser = createUser({
      username,
      email,
      authentication: {
        salt: salt,
        password: hashedPassword,
      },
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email or password is missing" });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.authentication.password
    );
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Unathenticated" });
    }

    // Generate JWT
    const token: string = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "",
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    user.authentication.sessionToken = token;
    await user.save();

    res.cookie("THCO-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end;
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
