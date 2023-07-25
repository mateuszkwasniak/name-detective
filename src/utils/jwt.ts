import { SignJWT, jwtVerify } from "jose";

export async function sign(payload: Token, secret: string): Promise<string> {
  const iat: number = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24;
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string, secret: string): Promise<Token> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload as Token;
}