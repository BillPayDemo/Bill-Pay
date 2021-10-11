// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getBillsCodat, payBillCodat, syncCodat } from "../../lib/codat";

export default async function handler(req, res) {
  const { method, body, url } = req;

  switch (method) {
    case "GET":
      const queryRaw = url.split("?")[1];
      const query = new URLSearchParams(queryRaw);
      const id = query.get("id");
      if (id) {
        var [codatStatus, results] = await getBillsCodat(id);
        res.status(codatStatus).json(results);
      } else {
        res.status(405).end();
      }
      break;
    case "PUT":
      if (!body.id || !body.connectionId || !body.companyId) {
        res.status(422).end("Missing id");
        break;
      }
      var [codatStatus, results] = await payBillCodat(
        body.id,
        body.connectionId,
        body.companyId,
        body.accountId
      );
      res.status(codatStatus).end(results);
      break;
    case "POST":
      if (!body.action && body.action != "sync") {
        res.status(422).end("Missing action or action is not sync");
        break;
      }
      var [codatStatus, results] = await syncCodat();
      res.status(codatStatus).end(results);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
