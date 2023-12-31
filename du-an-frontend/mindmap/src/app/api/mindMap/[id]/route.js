import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });
  try {
    const mindMap = await db.mindmap.findUnique({
      where: {
        id: params?.id,
        userId: currentUser?.id,
      },
    });
    if (!mindMap) return new NextResponse("Error", { status: 400 });
    const data = await req?.json();
    await db.mindmap.update({
      where: {
        id: params?.id,
        userId: currentUser?.id,
      },
      data,
    });
    return NextResponse.json(mindMap);
  } catch (error) {
    console.log("create_my_map", error);
  }
};

export const DELETE = async (req, { params }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });
  try {
    const mindMap = await db.mindmap.findUnique({
      where: {
        id: params?.id,
        userId: currentUser?.id,
      },
    });
    if (!mindMap) return new NextResponse("Error", { status: 400 });
    await db.mindmap.delete({
      where: {
        id: params?.id,
        userId: currentUser?.id,
      },
    });
    return NextResponse.json(mindMap);
  } catch (error) {
    console.log("create_my_map", error);
  }
};
