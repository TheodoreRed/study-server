import express from "express";

const accountRouter = express.Router();

// Route to get the current authenticated user's details
accountRouter.get("/current-user", (req, res) => {
  console.log("Checking if user is authenticated:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("Current user:", req.user);
    // Ensure the user is authenticated
    res.json(req.user); // Send the authenticated user's details
  } else {
    console.log("User not authenticated");
    res.status(401).json({ message: "User not authenticated" });
  }
});

export default accountRouter;
