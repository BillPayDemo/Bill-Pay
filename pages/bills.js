import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Bills() {
  const {data, error} = useSWR("/api/bills", fetcher);

  const listBills = (bills) => (
    <ul>
      {bills.map((bill) => (
        <li key={bill.id}>
          <pre>{JSON.stringify(bill, null, 2)}</pre>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <Head>
        <title>Bills</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Bills</h1>
        <div>
          {error && <div>error</div>}
          {!data && !error && <div>Loading</div>}
          {data && listBills(data)}
        </div>
      </main>
    </div>
  );
}
