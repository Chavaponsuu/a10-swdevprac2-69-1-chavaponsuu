import type { UserLogInResponse } from "@/types/auth";

export default async function userLogIn(
  userEmail: string,
  userPassword: string,
): Promise<UserLogInResponse> {
  const apiUrl = process.env.BACKEND_API_URL ||
    "https://a08-venue-explorer-backend.vercel.app/api/v1";
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: userEmail, password: userPassword }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to sign in (${response.status})`);
  }

  const result: UserLogInResponse = await response.json();

  if (!result.success || !result.token) {
    throw new Error("The backend did not return a valid login token");
  }

  return result;
}
