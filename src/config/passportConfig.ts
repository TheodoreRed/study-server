import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { connectDB } from "./db";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import Account from "../models/Account";
dotenv.config();

// Retrieve Google client ID and secret from environment variables
const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID ?? "";
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET ?? "";

const BACKEND_BASE_URL =
  process.env.BACKEND_BASE_URL ?? "http://localhost:3000";

// Store user ID in session
passport.serializeUser((user: any, done) => {
  // Convert the user's MongoDB ObjectId to a string for session storage
  console.log("Serializing user:", user);
  done(null, user._id.toString());
});

// Deserialize user function to retrieve user from session ID
passport.deserializeUser(async (id: string, done) => {
  console.log("Deserializing user with ID:", id);
  const client = await connectDB();
  const user = await client
    .db()
    .collection<Account>("accounts")
    .findOne({ _id: new ObjectId(id) });
  done(null, user || undefined);
});

// Define the Google OAuth strategy for use with Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID, // Google OAuth client ID
      clientSecret: GOOGLE_CLIENT_SECRET, // Google OAuth client secret
      callbackURL: `${BACKEND_BASE_URL}/auth/google/callback`, // URL to which Google will redirect after authentication
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const client = await connectDB();
      console.log("Google profile ID:", profile.id);

      let user = await client
        .db()
        .collection<Account>("accounts")
        .findOne({ googleId: profile.id });

      if (!user) {
        // If the user does not exist, create a new user.
        const response = await client
          .db()
          .collection<Account>("accounts")
          .insertOne({ googleId: profile.id });

        // Fetch the newly created user
        user = await client
          .db()
          .collection<Account>("accounts")
          .findOne({ _id: response.insertedId });
      }
      console.log("User from Google OAuth:", user);
      // Pass the user to the done callback, which attaches the user to the req.user. And is now serialized into the session
      done(null, user || undefined);
    }
  )
);

export default passport;
