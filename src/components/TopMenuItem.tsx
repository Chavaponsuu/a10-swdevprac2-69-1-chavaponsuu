import Link from 'next/link';
import styles from './top-menu.module.css';

export default function TopMenuItem({ title, pageRef }: { title: string, pageRef: string }) {
  return (
    <Link
      href={pageRef}
      className={styles.menuItem}
    >
      {title}
    </Link>
  );
}
