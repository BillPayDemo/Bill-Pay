import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import useSWR, {useSWRConfig} from "swr";
import BlockButton from "../components/BlockButton";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Bills() {
  const {mutate} = useSWRConfig();
  const {data, error} = useSWR("/api/bills", fetcher);

  const handlePayClick = (id) => {
    axios.put("/api/bills", {id: id});
    mutate("/api/bills");
  };

  const handleSyncClick = () => {
    axios.post("/api/bills", {action: "sync"});
  };

  const listBills = (bills) => (
    <ul>
      {bills.map((bill) => (
        <li key={bill.id}>
          <pre>
            {JSON.stringify(
              {
                id: bill.id,
                status: bill.status,
                totalAmount: bill.totalAmount,
                amountDue: bill.amountDue,
                issueDate: bill.issueDate,
              },
              null,
              2,
            )}
          </pre>
          <BlockButton onClick={() => handlePayClick(bill.id)} label="Pay" />
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
        <div>
          <BlockButton onClick={handleSyncClick} label="Sync" />
        </div>
      </main>
    </div>
  );
}
