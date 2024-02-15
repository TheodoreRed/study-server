# Authentication Routes Configuration

This document outlines the setup and functionality of the `AuthRouter.ts` file in an Express.js application, which configures routes for Google OAuth authentication using Passport.js.

## Overview

The `AuthRouter.ts` file creates and configures routes for initiating Google OAuth authentication, handling the callback after authentication, and logging out users. It leverages Passport.js's Google OAuth strategy to authenticate users with their Google accounts.

## Dependencies

- Express.js for routing.
- Passport.js with Google OAuth strategy for authentication.

## Route Configurations

### Google Authentication Route

Initiates the authentication process with Google.

```typescript
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
```

- **Path**: `/google`
- **Method**: GET
- **Functionality**: Redirects users to the Google sign-in page, asking for their profile information. The scope can be adjusted based on the required permissions.

### Google Authentication Callback Route

Handles the callback from Google after user authentication.

```typescript
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req: Request, res: Response) => {
    if (req.user) {
      // Authentication succeeded, redirect to your frontend application.
      res.redirect("http://localhost:5173/dashboard");
    }
  }
);
```

- **Path**: `/google/callback`
- **Method**: GET
- **Functionality**: Receives the callback from Google after authentication. If authentication fails, the user is redirected to `/login`. On success, the user is redirected to the frontend dashboard.

### Logout Route

Logs out the user and ends the session.

```typescript
router.get("/logout", (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect("/");
  });
});
```

- **Path**: `/logout`
- **Method**: GET
- **Functionality**: Ends the user's session and redirects to the home page.

## How It Works

1. **Starting Authentication**: Users initiate login by navigating to the `/google` route, which redirects them to Google for authentication.
2. **Google Sign-in**: Users sign in with their Google accounts and grant the requested permissions.
3. **Handling Callback**: Google redirects back to the `/google/callback` route with the authentication result. The application then either redirects the user to the dashboard on success or to the login page on failure.
4. **Logout**: Users can log out by navigating to the `/logout` route, which ends their session and redirects them to the home page.

## Usage

This configuration is designed to be integrated into an Express.js application, providing a straightforward way to add Google OAuth authentication. Ensure that Passport is configured with the Google strategy and that the necessary environment variables for the Google client ID and secret are set.

## Conclusion

The `AuthRouter.ts` file provides a concise and effective way to handle Google OAuth authentication in an Express.js application, offering routes for login, authentication callback handling, and logout functionalities.
