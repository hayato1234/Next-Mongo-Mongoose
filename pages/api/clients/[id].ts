// this is for Mongo without mongoose

import dbConnect from "../../../lib/dbConnect";
const Client = require("../../../models/client");

export default async function handler(req: any, res: any) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const client = await Client.findById(id);
        if (!client) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: client });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "PUT":
      try {
        const client = await Client.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!client) {
          return res.status(400).json({ success: false });
        }
        console.log("post success");
        res.status(200).json({ success: true, data: client });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedClient = await Client.deleteOne({ _id: id });
        if (!deletedClient) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: deletedClient });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
