import type { Route } from "./+types/register";
import LoginForm from "~/components/auth/login-form";
import { requireGuest } from "../../utils/route-guards";

export const clientLoader = () => {
  return requireGuest();
};

export default function LoginPage() {
  return (
    <div className="p-8 flex flex-col items-center justify-center">
      <h1 className="text-woodsmoke-50 text-4xl tracking-tight font-bold">
        Sign in
      </h1>
      <p className="text-woodsmoke-300 mt-4 tracking-tight lead mb-6">
        Login using email and password
      </p>
      <LoginForm />
    </div>
  );
}
