import { ObjectId } from "mongodb";

export default interface Account {
  _id?: ObjectId;
  googleId: string;
}
