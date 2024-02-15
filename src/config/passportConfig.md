# Passport Google OAuth Configuration

This document explains the setup and configuration of Passport with Google OAuth strategy for user authentication in a Node.js application. This setup enables users to log in using their Google accounts.

## Overview

The `passportConfig.ts` file configures Passport to use Google's OAuth 2.0 strategy for authenticating users. It integrates with MongoDB to store and retrieve user information based on the authentication result provided by Google.

## Prerequisites

- Node.js environment.
- MongoDB database.
- Google Cloud project with OAuth 2.0 Client IDs.
- `.env` file setup with Google Client ID, Google Client Secret, and MongoDB URI.

## Configuration Steps

### Import Dependencies

```typescript
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { connectDB } from "./db";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import Account from "../models/Account";
```

### Load Environment Variables

```typescript
dotenv.config();
```

### Google OAuth Credentials

Retrieve your Google Client ID and Google Client Secret from the environment variables:

```typescript
const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || "";
```

### User Serialization and Deserialization

Configure Passport to serialize and deserialize user instances to and from the session:

```typescript
passport.serializeUser((user: any, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id: string, done) => {
  const client = await connectDB();
  const user = await client
    .db()
    .collection<Account>("accounts")
    .findOne({ _id: new ObjectId(id) });
  done(null, user || undefined);
});
```

### GoogleStrategy Configuration

Define the Google OAuth strategy, specifying the client ID, client secret, and callback URL. Implement the strategy to handle user lookup or creation based on the Google profile ID:

```typescript
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const client = await connectDB();
      let user = await client
        .db()
        .collection<Account>("accounts")
        .findOne({ googleId: profile.id });

      if (!user) {
        const response = await client
          .db()
          .collection<Account>("accounts")
          .insertOne({ googleId: profile.id });
        user = await client
          .db()
          .collection<Account>("accounts")
          .findOne({ _id: response.insertedId });
      }

      done(null, user || undefined);
    }
  )
);
```

## How It Works

1. **User Login**: Initiates authentication with Google when a user clicks the "Login with Google" button.
2. **Google Authentication**: User is redirected to Google for authentication and consent.
3. **Callback Handling**: Upon successful authentication, Google redirects to the specified callback URL with an authorization code.
4. **User Lookup/Creation**: The application uses the profile information to lookup or create a user in the MongoDB database.
5. **Session Initialization**: A session is created for the user, allowing for persistent authentication across requests.
