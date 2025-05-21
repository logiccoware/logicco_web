import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface IProtectedRouteData {
  accessToken: string;
}

export async function protectedRoute(): Promise<IProtectedRouteData> {
  const { userId, redirectToSignIn, getToken } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const accessToken = await getToken();

  if (!accessToken) {
    return redirect("/");
  }

  return {
    accessToken,
  };
}
