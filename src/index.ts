import express from "express";

import cors from "cors";

const app = express();

app.use(cors());

// allow POST and PUT requests to use JSON bodies
app.use(express.json());

const someRouter = express.Router();
someRouter.get("/", (req, res) => {
  res.json({ message: "success" });
});
someRouter.get("/hello", (req, res) => {
  res.json({ message: "hello is successful too" });
});
app.use("/", someRouter);

const port = 3000;

app.listen(port, () => console.log(`Listening on port: ${port}.`));
