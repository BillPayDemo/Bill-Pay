import { Footer } from "../components/Footer/Footer";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { CompanyNameContent } from "../components/CompanyNameContent/CompanyNameContent";

export default function CompanyName() {
  return (
    <>
      <div className={styles.container}>
        <CompanyNameContent />
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
