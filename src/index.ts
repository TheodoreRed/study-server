import express from "express";
import cors from "cors";
import accountRouter from "./routes/AccountRouter";
import authRouter from "./routes/AuthRouter";
import session from "express-session";
import passport from "./config/passportConfig";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow sending cookies from the frontend
  })
);
// allow POST and PUT requests to use JSON bodies
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Set to true if you are using https
      httpOnly: true, // Helps against XSS attacks
      sameSite: "none", // Necessary for cross-origin requests; adjust based on your security requirements
    },
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

app.use("/", accountRouter);
app.use("/", authRouter);

const port = 3000;

app.listen(port, () => console.log(`Listening on port: ${port}.`));
