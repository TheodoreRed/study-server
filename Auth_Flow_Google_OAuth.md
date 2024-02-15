## Authentication Flow with Google OAuth

The authentication process begins when a user visits the site and clicks the "Login with Google" button. This section outlines the step-by-step process that occurs from this point onwards, integrating the frontend and backend systems with Google's OAuth 2.0 service.

### Step 1: User Initiates Login

- **Frontend Action**: When the user clicks the "Login with Google" button, the frontend makes a request to the backend endpoint `/auth/google`.
- **Backend Response**: The backend, configured with Passport.js and the Google OAuth strategy, redirects the request to Google's OAuth 2.0 servers for user authentication.

### Step 2: User Authenticates with Google

- **Google's OAuth Page**: The user is taken to the Google sign-in page, where they are asked to log in to their Google account (if not already logged in) and grant the application permission to access their profile information.
- **Permissions**: The permissions requested can include basic profile information like the user's name and email address, as specified in the OAuth scope during the Passport strategy setup.

### Step 3: Google Redirects Back to the Application

- **OAuth Callback**: After the user grants permission, Google redirects the user back to the application using the callback URL provided during the GoogleStrategy configuration (`http://localhost:3000/auth/google/callback` in this case).
- **Backend Processing**: The backend receives the callback request from Google, along with an authorization code. Passport's GoogleStrategy uses this code to obtain an access token and, optionally, a refresh token from Google.

### Step 4: User Lookup or Creation

- **Database Query**: Using the information provided by Google (contained in the profile object), the backend checks if a user with the corresponding Google ID exists in the database.
- **New User**: If no existing user is found, the backend creates a new user record in the database with the Google ID and any other relevant profile information.
- **Session Initialization**: The backend initializes a session for the user, storing their session information (e.g., user ID) in the server's memory or a session store.

### Step 5: Finalizing Authentication

- **Session Cookie**: The backend sends a response to the frontend with a session cookie. This cookie contains the session ID, which the frontend will use for subsequent authenticated requests.
- **Redirect to Dashboard**: The frontend redirects the user to the dashboard page (`/dashboard`). The application is now aware of the user's authenticated status through the session cookie.

### Step 6: Accessing User Information

- **Authenticated Requests**: When accessing protected routes or requesting user-specific data, the frontend includes the session cookie with the request.
- **Backend Validation**: The backend validates the session ID from the cookie against the stored session information. If the session is valid, it processes the request as authenticated.
- **Displaying User Data**: The frontend displays user-specific information, such as profile details, fetched from the backend based on the authenticated user session.

### Logout Process

- **User Initiates Logout**: The user can log out by clicking a logout button, which triggers a request to the backend's logout endpoint (`/auth/logout`).
- **Session Termination**: The backend terminates the user's session and clears the session cookie.
- **Redirection**: The user is redirected to the landing page or login page, effectively logging them out of the application.

This authentication flow ensures a secure and seamless user experience, leveraging Google's OAuth 2.0 service for authentication while maintaining user sessions for persistent access control within the application.
