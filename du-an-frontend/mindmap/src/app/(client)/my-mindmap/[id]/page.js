import getCurrentUser from "@/actions/getCurrentUser";
import FlowWithProvider from "@/components/FlowWithProvider";
import { db } from "@/libs/db";
import { redirect } from "next/navigation";
import React from "react";

const DetailMap = async ({ params }) => {
  const { id } = params || "";
  const currentUser = await getCurrentUser();
  const detailMindmap = await db.mindmap.findUnique({ where: { id } });
  if (!detailMindmap) return redirect("/my-mindmap");
  const isOwner = currentUser?.id === detailMindmap.userId;

  if (detailMindmap?.isPrivate && !currentUser) return redirect("/signIn");
  if (detailMindmap?.isPrivate && !isOwner) return redirect("/not-found");

  return <FlowWithProvider dataMindMap={detailMindmap} isOwner={isOwner} />;
};

export default DetailMap;
