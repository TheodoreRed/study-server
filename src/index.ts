import express from "express";

import cors from "cors";
import accountRouter from "./routes/AccountRouter";

const app = express();

app.use(cors());

// allow POST and PUT requests to use JSON bodies
app.use(express.json());

app.use("/", accountRouter);

const port = 3000;

app.listen(port, () => console.log(`Listening on port: ${port}.`));
