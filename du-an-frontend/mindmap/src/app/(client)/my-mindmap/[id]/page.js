import getCurrentUser from "@/actions/getCurrentUser";
import FlowWithProvider from "@/components/FlowWithProvider";
import { db } from "@/libs/db";
import { redirect } from "next/navigation";
import React from "react";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const detailMindmap = await db.mindmap.findUnique({ where: { id } });
  if (!detailMindmap?.isPrivate) {
    return {
      title: detailMindmap?.name,
      description: detailMindmap?.description,
      openGraph: {
        title: detailMindmap?.seo_title,
        description: detailMindmap?.seo_desc,
        images: [detailMindmap?.seo_img],
      },
    };
  }
  return {
    title: detailMindmap?.name,
    description: detailMindmap?.description,
  };
};

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
