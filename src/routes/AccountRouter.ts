import express from "express";
import { getClient } from "../db";
import Account from "../models/Account";
import { ObjectId } from "mongodb";

const accountRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// Get account by mongo _id:
accountRouter.get("/accounts/:_id", async (req, res) => {
  try {
    const _id = new ObjectId(req.params._id);
    const client = await getClient();
    const account = await client
      .db()
      .collection<Account>("accounts")
      .findOne({ _id });
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: "Account Does Not Exist" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

// Create new Account:
accountRouter.post("/accounts", async (req, res) => {
  try {
    if (!req.body.googleId) {
      res.status(400).json({ message: "Missing the google unique idenitifer" });
    }
    const account: Account = req.body;
    const client = await getClient();
    await client.db().collection<Account>("accounts").insertOne(account);
    res.status(201).json(account);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default accountRouter;
