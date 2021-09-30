module.exports = {
  reactStrictMode: true,
  env: {
    CODAT_PRE_URL: process.env.CODAT_PRE_URL,
    DEMO_COMPANY_ID: process.env.DEMO_COMPANY_ID,
    CODAT_BASIC_AUTH: process.env.CODAT_BASIC_AUTH,
    CODAT_CONNECTION_ID: process.env.CODAT_CONNECTION_ID,
    CODAT_PAYMENT_ACCOUNT_ID: process.env.CODAT_PAYMENT_ACCOUNT_ID,
    CODAT_PAYMENT_ACCOUNT_NAME: process.env.CODAT_PAYMENT_ACCOUNT_NAME,
  },
  images: {
    domains: ["www.theodo.co.uk"],
  },
};
