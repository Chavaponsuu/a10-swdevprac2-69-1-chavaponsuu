/** @jest-environment node */

import userLogIn from "@/libs/userLogIn";
import getUserProfile from "@/libs/getUserProfile";

const originalFetch = global.fetch;
const originalApiUrl = process.env.BACKEND_API_URL;
const fetchMock = jest.fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>();

beforeEach(() => {
  delete process.env.BACKEND_API_URL;
  global.fetch = fetchMock;
  fetchMock.mockReset();
});

afterAll(() => {
  global.fetch = originalFetch;
  if (originalApiUrl === undefined) {
    delete process.env.BACKEND_API_URL;
  } else {
    process.env.BACKEND_API_URL = originalApiUrl;
  }
});

it("posts the supplied credentials as JSON and returns the backend token", async () => {
  fetchMock.mockResolvedValueOnce(Response.json({
    success: true,
    _id: "alice-id",
    name: "Alice",
    email: "alice@eventplanner.com",
    token: "backend-token",
  }));

  const result = await userLogIn("alice@eventplanner.com", "test-password");

  expect(result.token).toBe("backend-token");
  expect(fetchMock).toHaveBeenCalledWith(
    "https://a08-venue-explorer-backend.vercel.app/api/v1/auth/login",
    expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: '{"email":"alice@eventplanner.com","password":"test-password"}',
      cache: "no-store",
    }),
  );
});

it("rejects a login that the backend refuses", async () => {
  fetchMock.mockResolvedValueOnce(Response.json({ success: false }, { status: 401 }));

  await expect(userLogIn("alice@eventplanner.com", "wrong-password"))
    .rejects.toThrow();
});

it("does not accept a successful response without a token", async () => {
  fetchMock.mockResolvedValueOnce(Response.json({ success: true }));

  await expect(userLogIn("alice@eventplanner.com", "test-password"))
    .rejects.toThrow();
});

it("fetches the profile with the supplied bearer token without caching user data", async () => {
  const profile = {
    success: true,
    data: {
      _id: "alice-id",
      name: "Alice",
      email: "alice@eventplanner.com",
      tel: "0854439954",
      role: "user",
      createdAt: "2025-03-13T10:27:19.226+00:00",
      __v: 0,
    },
  };
  fetchMock.mockResolvedValueOnce(Response.json(profile));

  expect(await getUserProfile("backend-token")).toEqual(profile);
  expect(fetchMock).toHaveBeenCalledWith(
    "https://a08-venue-explorer-backend.vercel.app/api/v1/auth/me",
    expect.objectContaining({
      method: "GET",
      headers: { Authorization: "Bearer backend-token" },
      cache: "no-store",
    }),
  );
});

it("rejects an expired or unauthorized profile request", async () => {
  fetchMock.mockResolvedValueOnce(Response.json({ success: false }, { status: 401 }));

  await expect(getUserProfile("expired-token")).rejects.toThrow();
});

it("uses the configured backup backend for both authentication requests", async () => {
  process.env.BACKEND_API_URL = "https://backup.example.test/api/v1";
  fetchMock.mockResolvedValueOnce(Response.json({
    success: true, _id: "alice-id", name: "Alice",
    email: "alice@eventplanner.com", token: "backup-token",
  }));
  fetchMock.mockResolvedValueOnce(Response.json({
    success: true,
    data: {
      _id: "alice-id", name: "Alice", email: "alice@eventplanner.com",
      tel: "0854439954", role: "user", createdAt: "2025-03-13T10:27:19.226+00:00", __v: 0,
    },
  }));

  const login = await userLogIn("alice@eventplanner.com", "test-password");
  const profile = await getUserProfile(login.token);

  expect(profile.data.name).toBe("Alice");
  expect(fetchMock).toHaveBeenNthCalledWith(1,
    "https://backup.example.test/api/v1/auth/login", expect.any(Object));
  expect(fetchMock).toHaveBeenNthCalledWith(2,
    "https://backup.example.test/api/v1/auth/me",
    expect.objectContaining({ headers: { Authorization: "Bearer backup-token" } }));
});
