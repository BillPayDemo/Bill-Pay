// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {getBillsCodat, payBillCodat} from "../../lib/codat";

export default async function handler(req, res) {
  const {method, body} = req;

  switch (method) {
    case "GET":
      var [codatStatus, results] = await getBillsCodat();
      res.status(codatStatus).json(results);
      break;
    case "PUT":
      if (!body.id) {
        res.status(422).end("Missing id");
        break;
      }
      var [codatStatus, results] = await payBillCodat(body.id);
      res.status(codatStatus).end(results);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
