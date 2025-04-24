// servidor: biblioteca de auth (removido 'use server')
import { SessionServer } from "@/types/session";
import * as jose from "jose";
import { cookies } from "next/headers";

export async function OpenSessionToken(token: string): Promise<any> {
  const secret = new TextEncoder().encode(process.env.JWT_SIGNING_PRIVATE_KEY);
  const { payload } = await jose.jwtVerify(token, secret);
  return payload;
}

export async function CreateSessionServer(payload = {}) {
  const secret = new TextEncoder().encode(process.env.JWT_SIGNING_PRIVATE_KEY);
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("4h")
    .sign(secret);

    const { exp } = await OpenSessionToken(jwt);

    cookies().set("session-token", jwt, {
      expires: (exp as number)*1000,
      path: "/",
      httpOnly: true,
    });
}

export async function CreateSessionClient(payload = {}) {
  const secret = new TextEncoder().encode(process.env.JWT_SIGNING_PRIVATE_KEY);
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("4h")
    .sign(secret);

    const { exp } = await OpenSessionToken(jwt);

    cookies().set("session", jwt, {
      expires: (exp as number)*1000,
      path: "/",
    });
}

export async function GetSessionClient() {
  const token = cookies().get("session");
  if (!token) {
    return null;
  }
  const data = await OpenSessionToken(token.value);
  return data;
}

export async function GetSessionServer(): Promise<SessionServer | null> {
  const token = cookies().get("session-token");
  if (!token) {
    return null;
  }
  const data = await OpenSessionToken(token.value);
  return data;
}

export async function DeleteSession() {
  cookies().delete("session");
  cookies().delete("session-token");
}