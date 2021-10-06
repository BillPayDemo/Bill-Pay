import axios from "axios";

const companyCodatId = process.env.DEMO_COMPANY_ID;
const codatPreUrl = process.env.CODAT_PRE_URL;
const codatConnectionId = process.env.CODAT_CONNECTION_ID;
const codatAccountId = process.env.CODAT_PAYMENT_ACCOUNT_ID;
const codatAccountName = process.env.CODAT_PAYMENT_ACCOUNT_NAME;

export async function syncCodat() {
  const syncUrl = `${codatPreUrl}/companies/${companyCodatId}/data/all`;
  try {
    var { data } = await axios.post(syncUrl, "", {
      headers: {
        accept: "*/*",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });
    return [200, "Sync succeeded"];
  } catch (error) {
    return [500, "Codat sync error"];
  }
}

export async function getBillsCodat() {
  const companyBillUrl = `${codatPreUrl}/companies/${companyCodatId}/data/bills?page=1&pageSize=20&orderBy=-issueDate`;

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
  const billPaymentUrl = `${codatPreUrl}/companies/${companyCodatId}/connections/${codatConnectionId}/push/billPayments`;

  try {
    var { data } = await axios.get(billUrl, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });
  } catch (error) {
    return [500, "Codat get bill error"];
  }

  const paymentBody = {
    totalAmount: data["amountDue"],
    date: new Date().toISOString(),
    supplierRef: data["supplierRef"],
    accountRef: {
      id: codatAccountId,
      name: codatAccountName,
    },
    lines: [
      {
        amount: data["amountDue"],
        links: [
          {
            type: "Bill",
            id: id,
            amount: -1 * data["amountDue"],
          },
        ],
      },
    ],
  };

  try {
    var { data } = await axios.post(billPaymentUrl, paymentBody, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return [500, "Codat post billpayment error"];
  }
  const [syncStatus, syncMessage] = await syncCodat();
  if (syncStatus === 200) {
    return [syncStatus, "Bill paid and sync"];
  } else {
    return [syncStatus, syncMessage];
  }
}

export async function getCompanyInfo() {
  const companyInfoUrl = `${codatPreUrl}/companies/${companyCodatId}/data/info`;

  try {
    const axiosRes = await axios.get(companyInfoUrl, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });
    return [200, axiosRes.data];
  } catch (error) {
    return [500, error];
  }
}

export async function getAccounts() {
  const companyBillUrl = `${codatPreUrl}/companies/${companyCodatId}/data/accounts`;

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
