import axios from "axios";

const codatPreUrl = process.env.CODAT_PRE_URL;

export async function syncBills(companyId) {
  const syncUrl = `${codatPreUrl}/companies/${companyId}/data/queue/bills`;
  try {
    var { data } = await axios.post(syncUrl, "", {
      headers: {
        accept: "*/*",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });
    return [200, "Bill sync succeeded"];
  } catch (error) {
    return [500, "Codat bill sync error"];
  }
}

export async function getDataStatus(companyId) {
  const dataStatusUrl = `${codatPreUrl}/companies/${companyId}/dataStatus`;
  try {
    var { data } = await axios.get(dataStatusUrl, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });
    return [200, data];
  } catch (error) {
    return [500, "Data status error"];
  }
}

export async function getBillsCodat(companyId) {
  const companyBillUrl = `${codatPreUrl}/companies/${companyId}/data/bills?page=1&pageSize=25&orderBy=-issueDate`;

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

export async function getConnectionId(companyId) {
  const companyConnectionId = `${codatPreUrl}/companies/${companyId}/connections?page=1&pageSize=25`;
  try {
    const axiosRes = await axios.get(companyConnectionId, {
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

export async function payBillCodat(id, connectionId, companyId, accountId) {
  const billUrl = `${codatPreUrl}/companies/${companyId}/data/bills/${id}`;
  const billPaymentUrl = `${codatPreUrl}/companies/${companyId}/connections/${connectionId}/push/billPayments`;

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
    currency: data["currency"],
    supplierRef: data["supplierRef"],
    accountRef: {
      id: accountId,
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
    return [200, "Sync successful"];
  } catch (error) {
    return [500, "Codat post bill payment error"];
  }
}

export async function getCompanyInfo(companyId) {
  const companyInfoUrl = `${codatPreUrl}/companies/${companyId}/data/info`;
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

export async function getAccounts(companyId) {
  const accountsUrl = `${codatPreUrl}/companies/${companyId}/data/accounts`;

  try {
    const axiosRes = await axios.get(accountsUrl, {
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

export async function createCompany(companyName) {
  const companyCreateUrl = `${codatPreUrl}/companies`;

  const companyCreateBody = {
    name: companyName,
  };

  try {
    var { data } = await axios.post(companyCreateUrl, companyCreateBody, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
        "Content-Type": "application/json",
      },
    });
    return [200, data];
  } catch (error) {
    return [500, "Codat create company error"];
  }
}
