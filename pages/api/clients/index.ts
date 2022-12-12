// this is for Mongo without mongoose

import dbConnect from "../../../lib/dbConnect";
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
const Client = require("../../../models/client");

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

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
