"use client";
import { Button } from "@nextui-org/button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AuthPage() {
  const { data: session } = useSession();

  if (session) {
    redirect("/profile");
  }

  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn("google")}>Sign in google</Button>
      {"  "}
      <Button onClick={() => signIn("github")}>Sign in github</Button>
    </>
  );
}
