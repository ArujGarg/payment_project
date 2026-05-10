"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(
  amount: number,
  provider: string,
) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  const token = Math.random().toString(); //ideally this token should be sent to you by the bank api

  if (!userId) {
    return {
      message: "User not found",
    };
  }

  await prisma.onRampTransaction.create({
    data: {
      amount,
      provider,
      token,
      userId: Number(userId),
      status: "Processing",
      startTime: new Date(),
    },
  });

  return {
    message: "On Ramp Transaction Created Successfully",
  };
}
