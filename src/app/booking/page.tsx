import Link from "next/link";
import { getServerSession } from "next-auth";
import DateReserve from "@/components/DateReserve";
import { authOptions } from "@/libs/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import type { UserProfile } from "@/types/auth";
import styles from "./page.module.css";

export default async function BookingPage() {
  const session = await getServerSession(authOptions);
  let profile: UserProfile | null = null;
  let profileError = false;

  if (session?.user?.token) {
    try {
      profile = (await getUserProfile(session.user.token)).data;
    } catch {
      profileError = true;
    }
  }

  return (
    <main className={styles.page}>
      {profile && (
        <section aria-labelledby="profile-heading" className={styles.profile}>
          <h2 id="profile-heading" className={styles.profileHeading}>Your Profile</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm">
            <dt className="font-semibold">Name</dt>
            <dd className="break-words min-w-0">{profile.name}</dd>
            <dt className="font-semibold">Email</dt>
            <dd className="break-words min-w-0">{profile.email}</dd>
            <dt className="font-semibold">Tel.</dt>
            <dd>{profile.tel}</dd>
            <dt className="font-semibold">Member Since</dt>
            <dd>
              <time dateTime={profile.createdAt}>
                {new Date(profile.createdAt).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
                })}
              </time>
            </dd>
          </dl>
        </section>
      )}
      {profileError && (
        <div role="alert" className={styles.profileError}>
          <p>We could not load your profile. Please try again or sign in again.</p>
          <Link href="/api/auth/signin?callbackUrl=%2Fbooking" className="font-semibold underline">Sign in again</Link>
        </div>
      )}
      <div className={styles.bookingCard}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Book a Venue</h1>
          <p className={styles.description}>
            Fill in the details below to reserve your venue.
          </p>
        </div>

        <hr className={styles.divider} />

        <form className={styles.form}>
          <DateReserve />

          <button
            name="Book Venue"
            type="submit"
            className={styles.bookButton}
          >
            Book Venue
          </button>
        </form>
      </div>
    </main>
  );
}
