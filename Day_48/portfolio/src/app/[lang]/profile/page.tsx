"use client";
import { Button } from "@nextui-org/button";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Avatar } from "@nextui-org/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  if (!session || !session?.user) {
    redirect("/auth");
  }

  return (
    <>
      <div className="flex gap-2 mb-3">
        <Avatar src={session.user.image || ""} />
        <div className="flex flex-col items-start gap-1">
          <span className="text-small">{session?.user?.name}</span>
          <span className="text-tiny text-foreground-400">
            {session?.user?.email}
          </span>
        </div>
      </div>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </Button>
    </>
  );
}
