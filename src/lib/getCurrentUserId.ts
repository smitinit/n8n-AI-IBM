import { auth } from "@clerk/nextjs/server";

export async function getCurrentUserId() {
  const user = await auth();
  return user.userId;
}
