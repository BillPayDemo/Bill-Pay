import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Bills() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bills</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Bills</h1>
      </main>
    </div>
  );
}
