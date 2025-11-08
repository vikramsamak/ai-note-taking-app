"use client";

// import { useSession } from "better-auth/react"; // This is a placeholder path
import { PublicNavbar } from "./public-navbar";
import { DashboardNavbar } from "./dashboard-navbar";

// A mock session hook for demonstration purposes.
// Replace this with your actual session hook from 'better-auth/react' or your auth library.
const useSession = () => {
  // To test the public navbar, return { user: null }.
  // To test the dashboard navbar, return { user: { name: "Test User" } }.
  return { user: null }; 
};


export function Navbar() {
  const { user } = useSession();

  if (!user) {
    return <PublicNavbar />;
  }

  return <DashboardNavbar />;
}
