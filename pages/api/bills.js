// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default function handler(req, res) {
  const companyCodatId = process.env.DEMO_COMPANY_ID;
  const codatPreUrl = process.env.CODAT_PRE_URL;
  const companyBillUrl = `${codatPreUrl}/companies/${companyCodatId}/data/bills?page=1&pageSize=2`;

  axios
    .get(companyBillUrl, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    })
    .then(function (response) {
      res.status(200).json(response.data.results);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
