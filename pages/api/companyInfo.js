import { getCompanyInfo } from "../../lib/codat";

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      var [codatStatus, results] = await getCompanyInfo();
      res.status(codatStatus).json(results);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
