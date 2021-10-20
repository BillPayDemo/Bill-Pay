import axios from "axios";

const codatPreUrl = process.env.CODAT_PRE_URL;

const getErrorDetails = (error) => {
  const errorData = error.response.data;
  return [errorData.statusCode, errorData.error];
};

export async function syncBills(companyId) {
  const syncUrl = `${codatPreUrl}/companies/${companyId}/data/queue/bills`;

  try {
    var { data: syncBills } = await axios.post(syncUrl, "", {
      headers: {
        accept: "*/*",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });
    var syncId = syncBills.id;
  } catch (error) {
    return getErrorDetails(error);
  }

  const syncStatusUrl = `${codatPreUrl}/companies/${companyId}/data/history/${syncId}`;

  try {
    await getSyncStatus(syncStatusUrl);
  } catch (error) {
    return getErrorDetails(error);
  }

  return [200, "Codat sync bills successful"];
}

const getSyncStatus = async (syncStatusUrl) => {
  for (let i = 0; i < 20; i++) {
    const { data: syncData } = await axios.get(syncStatusUrl, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });
    if (syncData.isCompleted === true) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  return;
};

export async function getDataStatus(companyId) {
  const dataStatusUrl = `${codatPreUrl}/companies/${companyId}/dataStatus`;
  try {
    const data = await getDataStatusCall(dataStatusUrl);
    return [200, data];
  } catch (error) {
    return getErrorDetails(error);
  }
}

const allComplete = (arr) => arr.every((val) => val === "Complete");

const getDataStatusCall = async (dataStatusUrl) => {
  for (let i = 0; i < 20; i++) {
    let statusList = [];
    var { data } = await axios.get(dataStatusUrl, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });

    for (var key in data) {
      statusList.push(data[key].currentStatus);
    }

    if (allComplete(statusList)) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  return data;
};

export async function getBillsCodat(
  companyId,
  pageSize,
  pageNumber,
  isFilteredBills
) {
  const query = isFilteredBills === "true" ? "&query=status%3DOpen" : "";
  const companyBillUrl = `${codatPreUrl}/companies/${companyId}/data/bills?page=${pageNumber}&pageSize=${pageSize}&orderBy=-issueDate${query}`;
  try {
    const axiosRes = await axios.get(companyBillUrl, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });
    return [200, axiosRes.data];
  } catch (error) {
    return getErrorDetails(error);
  }
}

export async function getConnectionId(companyId) {
  const companyConnectionId = `${codatPreUrl}/companies/${companyId}/connections?page=1`;
  try {
    const axiosRes = await axios.get(companyConnectionId, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });
    return [200, axiosRes.data.results];
  } catch (error) {
    return getErrorDetails(error);
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
    return getErrorDetails(error);
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
    var { data: paymentData } = await axios.post(billPaymentUrl, paymentBody, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
        "Content-Type": "application/json",
      },
    });
    var pushOperationKey = paymentData.pushOperationKey;
  } catch (error) {
    return getErrorDetails(error);
  }

  const billPushUrl = `${codatPreUrl}/companies/${companyId}/push/${pushOperationKey}`;

  try {
    await getBillStatus(billPushUrl);
  } catch (error) {
    return getErrorDetails(error);
  }
  return [200, "Codat bill payment successful"];
}

const getBillStatus = async (billPushUrl) => {
  for (let i = 0; i < 10; i++) {
    const { data: pushData } = await axios.get(billPushUrl, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CODAT_BASIC_AUTH,
      },
    });
    if (pushData.status === "Success") {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return;
};

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
    return getErrorDetails(error);
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
    return getErrorDetails(error);
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
    return getErrorDetails(error);
  }
}
