import Signin from "@/components/Signin";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SignInpage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};
  return (
    <section className="flex justify-center mt-[30%]">
      <Signin providers={providers} />
    </section>
  );
}
