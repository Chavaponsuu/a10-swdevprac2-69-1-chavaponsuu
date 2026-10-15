export default function getVenueImageUrl(src: string): string {
  if (!src.startsWith("https://drive.google.com/uc?")) {
    return src;
  }

  const fileId = new URL(src).searchParams.get("id");

  return fileId
    ? `https://lh3.googleusercontent.com/d/${encodeURIComponent(fileId)}`
    : src;
}
