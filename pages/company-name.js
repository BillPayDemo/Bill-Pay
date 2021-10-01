import { Footer } from "../components/Footer/Footer";
import Link from "next/link";
import { TextInput } from "@codat/orchard-ui";
import styles from "../styles/Home.module.css";

export default function CompanyName() {
  return (
    <>
      <div className={styles.container}>
        <TextInput
          id="company-name"
          label="Enter your company name"
          placeholder="e.g. Pete's Pies"
          value=""
        />
        <h4 className="title">
          Get your{" "}
          <Link href="/bills">
            <a>Bills</a>
          </Link>
        </h4>
      </div>
      <Footer />
    </>
  );
}
