import { Footer } from "../components/Footer/Footer";
import Link from "next/link";
import { Button, TextInput } from "@codat/orchard-ui";
import styles from "../styles/Home.module.css";

export default function CompanyName() {
  return (
    <>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "14.5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            id="company-name"
            label="Enter your company name"
            placeholder="e.g. Pete's Pies"
            value=""
          />
          <Button label="Next" className={styles.button} onClick={() => null} />
        </div>
        <h4 className="title">
          Go straight to{" "}
          <Link href="/bills">
            <a>Bills</a>
          </Link>
        </h4>
      </div>
      <Footer />
    </>
  );
}
