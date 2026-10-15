import VenueCatalog from "@/components/VenueCatalog";
import getVenues from "@/libs/getVenues";

export default function VenuePage() {
  const venues = getVenues();

  return <VenueCatalog venuesJson={venues} />;
}
