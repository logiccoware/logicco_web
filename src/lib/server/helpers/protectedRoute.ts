import { auth } from "@clerk/nextjs/server";

export async function protectedRoute() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }
}
