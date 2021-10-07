import { getCompanyInfo, createCompany } from "../../lib/codat";

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      var [codatStatus, results] = await getCompanyInfo();
      res.status(codatStatus).json(results);
      break;
    case "POST":
      if (!body.companyName || body.companyName === "") {
        res.status(422).end("Missing company name");
        break;
      }
      var [codatStatus, results] = await createCompany(body.companyName);
      res.status(codatStatus).json(results);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
