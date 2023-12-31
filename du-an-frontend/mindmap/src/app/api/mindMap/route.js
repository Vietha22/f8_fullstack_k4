import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export const POST = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });
  try {
    const mindMap = await db.mindmap.create({
      data: {
        userId: currentUser?.id,
        name: "Minimap không có tên",
        description: "Chưa có mô tả",
        isPrivate: true,
      },
    });
    return NextResponse.json(mindMap);
  } catch (error) {
    console.log("create_my_map", error);
  }
};

export const GET = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });
  try {
    const mindMap = await db.mindmap.findMany({
      where: {
        userId: currentUser?.id,
      },
    });
    return NextResponse.json(mindMap);
  } catch (error) {
    console.log("create_my_map", error);
  }
};
