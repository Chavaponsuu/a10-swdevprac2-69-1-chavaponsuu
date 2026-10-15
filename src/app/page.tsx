import styles from "./page.module.css";
import Banner from "@/components/Banner";
import PromoteCard from "@/components/PromoteCard";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Banner />
        <PromoteCard />
      </div>
    </div>
  );
}
