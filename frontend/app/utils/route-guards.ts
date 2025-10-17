import { redirect } from "react-router";
import { isAuthenticated } from "./auth";

// protected routes
export const requireAuth = async () => {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    throw redirect("/login");
  }
  return null;
};

// public routes
export const requireGuest = async () => {
  const authenticated = await isAuthenticated();
  if (authenticated) {
    throw redirect("/"); // redirect to home if already authenticated
  }
  return null;
};

// both public and protected
export const allowBoth = () => {
  return null;
};
