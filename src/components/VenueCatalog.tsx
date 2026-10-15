import styles from "@/app/page.module.css";
import Card from "./Card";

export default async function VenueCatalog({
  venuesJson,
}: {
  venuesJson: Promise<VenueJson>;
}) {
  const venues = await venuesJson;

  return (
    <div className={styles.cardsGrid}>
      {venues.data.map((venue: VenueItem) => (
        <Card
          key={venue.id}
          vid={venue.id}
          venueName={venue.name}
          imgSrc={venue.picture}
        />
      ))}
    </div>
  );
}
