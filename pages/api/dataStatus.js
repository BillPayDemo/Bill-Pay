import { getDataStatus } from "../../lib/codat";

export default async function handler(req, res) {
  const { method, url } = req;

  switch (method) {
    case "GET":
      const queryRaw = url.split("?")[1];
      const query = new URLSearchParams(queryRaw);
      const id = query.get("id");
      var [codatStatus, results] = await getDataStatus(id);
      res.status(codatStatus).json(results);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
