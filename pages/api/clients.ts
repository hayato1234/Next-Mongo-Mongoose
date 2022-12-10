import dbConnect from "../../lib/dbConnect";
const Client = require("../../models/client");

export default async function handler(req: any, res: any) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const clients = await Client.find({});
        res.status(200).json(clients);

        // res.status(200).json({ success: true, data: clients });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        await Client.create(req.body);
        console.log("post success");
        req.status(200).json(req.body);
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
