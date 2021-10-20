// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getBillsCodat, payBillCodat, syncBills } from "../../lib/codat";

export default async function handler(req, res) {
  const { method, body, url } = req;

  switch (method) {
    case "GET":
      const queryRaw = url.split("?")[1];
      const query = new URLSearchParams(queryRaw);
      const id = query.get("id");
      const pageSize = query.get("pageSize");
      const pageNumber = query.get("pageNumber");
      const isFilteredBills = query.get("isFilteredBills");
      var [codatStatus, results] = await getBillsCodat(
        id,
        pageSize,
        pageNumber,
        isFilteredBills
      );
      res.status(codatStatus).json(results);
      break;
    case "PUT":
      if (
        !body.id ||
        !body.connectionId ||
        !body.companyId ||
        !body.accountId
      ) {
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
      if ((!body.action && body.action != "sync") || !body.companyId) {
        res
          .status(422)
          .end("Missing action, action is not sync or missing company id");
        break;
      }
      var [codatStatus, results] = await syncBills(body.companyId);
      res.status(codatStatus).end(results);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
