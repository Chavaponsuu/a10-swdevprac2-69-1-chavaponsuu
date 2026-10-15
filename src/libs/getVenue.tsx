import { notFound } from "next/navigation";

export default async function getVenue(vid: string): Promise<VenueDetailJson> {
  const response = await fetch(
    `https://a08-venue-explorer-backend.vercel.app/api/v1/venues/${encodeURIComponent(vid)}`,
    { cache: "no-store" },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch venue (${response.status})`);
  }

  return response.json();
}
