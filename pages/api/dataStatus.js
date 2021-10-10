import { getDataStatus } from "../../lib/codat";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      var [codatStatus, results] = await getDataStatus();
      res.status(codatStatus).json(results);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
