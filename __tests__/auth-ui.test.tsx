import { render, screen } from "@testing-library/react";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Banner from "@/components/Banner";
import TopMenu from "@/components/TopMenu";
import BookingPage from "@/app/booking/page";
import getUserProfile from "@/libs/getUserProfile";

jest.mock("next-auth", () => ({ getServerSession: jest.fn() }));
jest.mock("next-auth/react", () => ({ useSession: jest.fn() }));
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock("@/libs/getUserProfile", () => ({ __esModule: true, default: jest.fn() }));

const session = {
  expires: "2026-11-01T00:00:00.000Z",
  user: { id: "alice-id", name: "Alice", email: "alice@eventplanner.com", token: "backend-token" },
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(useSession).mockReturnValue({ data: null, status: "unauthenticated", update: jest.fn() });
  jest.mocked(getServerSession).mockResolvedValue(null);
});

it("shows a sign-in link for guests", () => {
  render(<TopMenu />);

  expect(screen.getByRole("link", { name: "Sign-In" })).toHaveAttribute("href", "/api/auth/signin");
  expect(screen.getByRole("link", { name: "Booking" })).toHaveAttribute("href", "/booking");
});

it("changes to a sign-out link after authentication", () => {
  jest.mocked(useSession).mockReturnValue({ data: session, status: "authenticated", update: jest.fn() });
  render(<TopMenu />);

  expect(screen.getByRole("link", { name: "Sign-Out" })).toHaveAttribute("href", "/api/auth/signout");
  expect(screen.queryByRole("link", { name: "Sign-In" })).not.toBeInTheDocument();
});

it("shows a personalized welcome on the banner", () => {
  jest.mocked(useSession).mockReturnValue({ data: session, status: "authenticated", update: jest.fn() });
  render(<Banner />);

  expect(screen.getByText("Welcome Alice")).toBeInTheDocument();
});

it("keeps the banner usable without a session", () => {
  render(<Banner />);

  expect(screen.queryByText(/Welcome/)).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Select Venue" })).toBeInTheDocument();
});

it("keeps the booking form available for guests without requesting a profile", async () => {
  render(await BookingPage());

  expect(screen.getByRole("heading", { name: "Book a Venue" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Book Venue" })).toBeInTheDocument();
  expect(getUserProfile).not.toHaveBeenCalled();
});

it("shows all four profile fields above the booking form", async () => {
  jest.mocked(getServerSession).mockResolvedValue(session);
  jest.mocked(getUserProfile).mockResolvedValue({
    success: true,
    data: {
      _id: "alice-id", name: "Alice", email: "alice@eventplanner.com",
      tel: "0854439954", role: "user", createdAt: "2025-03-13T10:27:19.226+00:00", __v: 0,
    },
  });
  render(await BookingPage());

  for (const text of ["Name", "Email", "Tel.", "Member Since", "Alice", "alice@eventplanner.com", "0854439954", "March 13, 2025"]) {
    expect(screen.getByText(text)).toBeInTheDocument();
  }
  expect(getUserProfile).toHaveBeenCalledWith("backend-token");
});

it("keeps the booking form and offers sign-in when fetching the profile fails", async () => {
  jest.mocked(getServerSession).mockResolvedValue(session);
  jest.mocked(getUserProfile).mockRejectedValue(new Error("Unauthorized"));
  render(await BookingPage());

  expect(screen.getByRole("alert")).toHaveTextContent(/profile/i);
  expect(screen.getByRole("link", { name: "Sign in again" })).toHaveAttribute("href", "/api/auth/signin?callbackUrl=%2Fbooking");
  expect(screen.getByRole("button", { name: "Book Venue" })).toBeInTheDocument();
});
