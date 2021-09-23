import axios from "axios";

const companyCodatId = process.env.DEMO_COMPANY_ID;
const codatPreUrl = process.env.CODAT_PRE_URL;
const codatConnectionId = process.env.CODAT_CONNECTION_ID;

export async function getBillsCodat() {
  const companyBillUrl = `${codatPreUrl}/companies/${companyCodatId}/data/bills?page=1&pageSize=5&orderBy=-issueDate`;
  try {
    const axiosRes = await axios.get(companyBillUrl, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });
    return [200, axiosRes.data.results];
  } catch (error) {
    return [500, error];
  }
}

export async function payBillCodat(id) {
  const billUrl = `${codatPreUrl}/companies/${companyCodatId}/data/bills/${id}`;
  const putBillUrl = `${codatPreUrl}/companies/${companyCodatId}/connections/${codatConnectionId}/push/bills/${id}`;

  try {
    var {data} = await axios.get(billUrl, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });
  } catch (error) {
    return [500, "Codat get bill error"];
  }

  data["status"] = "Paid";

  try {
    var {data} = await axios.put(putBillUrl, data, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });
    return [200, "Bill updated"];
  } catch (error) {
    return [500, "Codat put bill error"];
  }
}
