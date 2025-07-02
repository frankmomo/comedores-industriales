// app/auth/signup/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./SignUpForm";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/auth/signin");
  }

  return <SignUpForm />;
}
