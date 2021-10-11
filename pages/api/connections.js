import { getConnectionId } from "../../lib/codat";

export default async function handler(req, res) {
  const { method, body, url } = req;

  switch (method) {
    case "GET":
      const queryRaw = url.split("?")[1];
      const query = new URLSearchParams(queryRaw);
      const id = query.get("id");
      if (id) {
        var [codatStatus, results] = await getConnectionId(id);
        res.status(codatStatus).json(results);
      } else {
        res.status(405).end();
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
