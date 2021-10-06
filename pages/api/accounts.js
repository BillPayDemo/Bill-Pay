import { getAccounts } from "../../lib/codat";

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      var [codatStatus, results] = await getAccounts();
      res.status(codatStatus).json(results);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
