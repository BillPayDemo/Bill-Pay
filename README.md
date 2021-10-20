# Codat Demo App

This project is a Next.js app developed by Theodo UK. This Codat Demo is used to the bill payment functionality from the Codat API. More specifically, if demonstrates how we can manage bill payments of apps like Quickbooks Sandbox.
## Getting Started
### Local Development
#### In Codat
You should have a Codat account connected to the source that you want. For example to connect your Codat account to a Quickbooks Sandbox, follow these instructions: https://docs.codat.io/docs/accounting-quickbooksonline-sandbox-setup

#### On your laptop
To ensure that you can run the development server, make sure that the following are installed
- npm version 16.9.0
- next version 10

To install all the dependencies, run `yarn` in your terminal at the root of your project.

In a `.env` file you will also need to add the following environment variables:
- a token as `CODAT_BASIC_AUTH` (which you can obtain from https://app-uat.codat.io/learn)
- the pre url as `CODAT_PRE_URL` (e.g. if you are working with uat, use `https://api-uat.codat.io`)


To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

