// middleware/isAuthenticatedUser.js
import { getServerSession, getSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function isAuthenticatedUser(req, res) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  req.user = session.user;

  return null;
}
