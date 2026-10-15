import type { UserProfileResponse } from "@/types/auth";

export default async function getUserProfile(
  token: string,
): Promise<UserProfileResponse> {
  const apiUrl = process.env.BACKEND_API_URL ||
    "https://a08-venue-explorer-backend.vercel.app/api/v1";
  const response = await fetch(`${apiUrl}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user profile (${response.status})`);
  }

  const result: UserProfileResponse = await response.json();

  if (!result.success || !result.data) {
    throw new Error("The backend did not return a user profile");
  }

  return result;
}
