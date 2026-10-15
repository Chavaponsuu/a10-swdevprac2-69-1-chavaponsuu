/** @jest-environment node */

import type { NextAuthOptions, User } from "next-auth";
import type { CredentialsConfig } from "next-auth/providers/credentials";
import { authOptions } from "@/libs/authOptions";

const originalFetch = global.fetch;
const fetchMock = jest.fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>();
const user: User = {
  id: "alice-id",
  name: "Alice",
  email: "alice@eventplanner.com",
  token: "backend-token",
};

const provider = authOptions.providers[0] as CredentialsConfig & {
  options: CredentialsConfig;
};

beforeEach(() => {
  global.fetch = fetchMock;
  fetchMock.mockReset();
});

afterAll(() => {
  global.fetch = originalFetch;
});

it("authorizes backend credentials and maps the user identity and token", async () => {
  fetchMock.mockResolvedValueOnce(Response.json({
    success: true,
    _id: "alice-id",
    name: "Alice",
    email: "alice@eventplanner.com",
    token: "backend-token",
  }));

  const result = await provider.options.authorize(
    { email: "alice@eventplanner.com", password: "test-password" },
    {},
  );

  expect(result).toEqual(user);
});

it("returns no user for missing credentials", async () => {
  expect(await provider.options.authorize(undefined, {})).toBeNull();
  expect(fetchMock).not.toHaveBeenCalled();
});

it("returns no user when the backend rejects the credentials", async () => {
  fetchMock.mockResolvedValueOnce(Response.json({ success: false }, { status: 401 }));

  expect(await provider.options.authorize(
    { email: "alice@eventplanner.com", password: "wrong-password" },
    {},
  )).toBeNull();
});

it("retains the backend token when an existing JWT is read again", async () => {
  const jwt = authOptions.callbacks!.jwt!;
  const initialToken = await jwt({ token: {}, user, account: null, trigger: "signIn" });
  type JwtParams = Parameters<NonNullable<NonNullable<NextAuthOptions["callbacks"]>["jwt"]>>[0];
  const existingToken = await jwt({ token: initialToken } as JwtParams);

  expect(existingToken).toEqual(expect.objectContaining({
    id: "alice-id",
    token: "backend-token",
  }));
});

it("exposes the backend token on the authenticated user's session", async () => {
  const callback = authOptions.callbacks!.session!;
  const result = await callback({
    session: { user: { ...user }, expires: "2026-11-01T00:00:00.000Z" },
    token: { id: "alice-id", token: "backend-token", name: "Alice", email: "alice@eventplanner.com" },
  } as Parameters<typeof callback>[0]);

  expect(result.user).toEqual(expect.objectContaining({
    id: "alice-id",
    name: "Alice",
    token: "backend-token",
  }));
});
