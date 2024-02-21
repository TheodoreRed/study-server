import express, { Request, Response } from "express";
import dotenv from "dotenv";
import passport from "../config/passportConfig";
dotenv.config();

const router = express.Router();

const FRONTEND_BASE_URL =
  process.env.FRONTEND_BASE_URL ?? "https://localhost:5173";

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
); // Passport uses the Google OAuth strategy you've configured to redirect the user to Google's OAuth 2.0 server for authentication.

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/landing-page",
  }),
  async (req: Request, res: Response) => {
    if (req.user) {
      console.log("Authenticated user:", req.user);
      res.redirect(`${FRONTEND_BASE_URL}/dashboard`);
    }
  }
); // Here, passport.authenticate('google', { failureRedirect: '/landing-page' }) attempts to exchange the authorization code for the user's profile information.

router.get("/landing-page", (_req: Request, res: Response) => {
  res.redirect(FRONTEND_BASE_URL);
});

// 'logout()' is a Passport method to terminate a login session
router.get("/auth/logout", (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect(FRONTEND_BASE_URL);
  });
});

export default router;
