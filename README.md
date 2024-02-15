# Full-Stack Application with Google OAuth Authentication

This application demonstrates a full-stack web application using Express.js, MongoDB, and React. It features user authentication via Google OAuth, leveraging Passport.js for handling the OAuth flow.

## Backend

The backend is built with Node.js and Express, using MongoDB for data storage.

### Setup

- Node.js and npm must be installed.
- A MongoDB instance is required, either locally or hosted.
- Google OAuth credentials (Client ID and Client Secret) are needed for authentication.

### Key Components

#### index.ts

- Initializes the Express application, setting up middleware for CORS, JSON parsing, session management, and Passport.
- Registers route handlers for account-related actions and authentication.

#### config/db.ts

- Establishes a connection to MongoDB using the connection URI from environment variables.

#### config/passportConfig.ts

- Configures Passport to use Google's OAuth2 strategy for authentication.
- Implements serialize and deserialize user functions for session management.
- Handles user lookup or creation based on Google profile information.

#### routes/AuthRouter.ts and routes/AccountRouter.ts

- `AuthRouter` manages routes for initiating the Google OAuth process, handling the callback, and logging out.
- `AccountRouter` provides a route to fetch the current authenticated user's details.

#### models/Account.ts

- Defines the `Account` model interface for MongoDB documents.

### Environment Variables

- `SESSION_SECRET`: A secret key for session handling.
- `MONGO_URI`: The MongoDB connection URI.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Credentials for Google OAuth.

## Frontend

Built with React, the frontend provides a user interface for login and displaying user data.

### Setup

- Requires Node.js and npm.
- Uses React Router for navigation.

### Key Components

#### App.tsx

- Sets up routing for the landing page and the dashboard.

#### services/accountApi.ts

- Includes a function to fetch the current user's details from the backend.

#### component/Dashboard.tsx

- Displays the current user's information, fetched from the backend.

## Getting Started

### Backend

1. Install dependencies: `npm install`.
2. Set up environment variables in a `.env` file.
3. Run the server: `npm start`.

### Frontend

1. Install dependencies: `npm install`.
2. Adjust the `baseUrl` in `services/accountApi.ts` if needed.
3. Start the application: `npm start`.

## Google OAuth Flow

1. User clicks "Login with Google" and is redirected to Google's login page.
2. After authentication, Google redirects to the callback URL.
3. The backend handles the callback, creating or updating the user record.
4. The user is redirected to the frontend dashboard, where their information is displayed.
