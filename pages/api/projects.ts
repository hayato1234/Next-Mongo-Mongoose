// this is for Mongo without mongoose

import { WithId, Document } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async (
  req: any,
  res: { json: (arg0: WithId<Document>[]) => void }
) => {
  try {
    const client = await clientPromise;
    const db = client.db("cp_db");

    const movies = await db
      .collection("projects")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    res.json(movies);
  } catch (e) {
    console.error(e);
  }
};
