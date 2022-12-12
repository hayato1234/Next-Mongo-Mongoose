// this is for Mongo with mongoose
import dbConnect from "../../../lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import runMiddleware from "../appCors";
const Client = require("../../../models/client");
const Cors = require("cors");

const whitelist = ["http://localhost:3000", "https://localhost:3443"];
const cors = Cors({
  methods: ["POST", "HEAD"],
  origin: whitelist,
  optionsSuccessStatus: 200,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const clients = await Client.find({});
        res.status(200).json({ success: true, data: clients });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        const client = await Client.create(req.body);
        console.log("post success");
        res.status(201).json({ success: true, data: client });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
