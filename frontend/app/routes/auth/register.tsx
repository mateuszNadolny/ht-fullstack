import type { Route } from "./+types/register";
import RegisterForm from "~/components/auth/register-form";
import { requireGuest } from "../../utils/route-guards";

export const clientLoader = () => {
  return requireGuest();
};

export default function RegisterPage() {
  return (
    <div className="p-8 flex flex-col items-center justify-center">
      <h1 className="text-woodsmoke-50 text-4xl tracking-tight font-bold">
        Register
      </h1>
      <p className="text-woodsmoke-300 mt-4 tracking-tight lead mb-6">
        Create a new account
      </p>
      <RegisterForm />
    </div>
  );
}
