import express from "express";

const accountRouter = express.Router();

// Route to get the current authenticated user's details
accountRouter.get("/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    // Ensure the user is authenticated
    res.json(req.user); // Send the authenticated user's details
  } else {
    res.status(401).json({ message: "User not authenticated" });
  }
});

export default accountRouter;
