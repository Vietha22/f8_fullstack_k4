import { db } from '@/libs/db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
  const body = await request.json();
  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await db.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });
  return NextResponse.json(user);
};
