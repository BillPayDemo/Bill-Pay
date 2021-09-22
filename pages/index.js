import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Accounting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Accounting</h1>
        <h1 className="title">
          Get your{" "}
          <Link href="/bills">
            <a>Bills</a>
          </Link>
        </h1>
      </main>
    </div>
  );
}
