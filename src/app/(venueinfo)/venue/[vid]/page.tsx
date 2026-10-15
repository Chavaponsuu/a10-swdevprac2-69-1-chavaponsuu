import Image from "next/image";
import Link from "next/link";
import getVenue from "@/libs/getVenue";
import getVenueImageUrl from "@/libs/getVenueImageUrl";
import styles from "./page.module.css";

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ vid: string }>;
}) {
  const { vid } = await params;
  const venueJson = await getVenue(vid);
  const venue: VenueItem = venueJson.data;

  return (
    <main className={styles.page}>
      <section className={styles.detailCard}>
        <div className={styles.imageSection}>
          <Image
            src={getVenueImageUrl(venue.picture)}
            alt={venue.name}
            width={1200}
            height={800}
            className={styles.image}
            referrerPolicy="no-referrer"
            preload
            unoptimized
          />
          <span className={styles.venueId}>Venue #{venue.id}</span>
        </div>

        <div className={styles.content}>
          <Link href="/venue" className={styles.backLink}>
            ← Back to all venues
          </Link>
          <p className={styles.eyebrow}>Featured event space</p>
          <h1>{venue.name}</h1>
          <p className={styles.description}>
            {venue.address}, {venue.district}, {venue.province} {venue.postalcode}
          </p>

          <div className={styles.infoRow}>
            <div>
              <span>Daily rental rate</span>
              <strong>{venue.dailyrate.toLocaleString("en-US")} THB / day</strong>
            </div>
            <div>
              <span>Telephone</span>
              <strong>{venue.tel}</strong>
            </div>
          </div>

          <Link href="/booking" className={styles.bookingLink}>
            Book this venue
          </Link>
        </div>
      </section>
    </main>
  );
}
