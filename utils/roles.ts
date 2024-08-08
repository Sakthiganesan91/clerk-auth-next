import { auth } from "@clerk/nextjs/server";

export const checkRole = (role: "admin" | "user") => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
};
