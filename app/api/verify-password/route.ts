import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import type { AuthGate } from "@/lib/auth";

const TOKEN_EXPIRY = "24h";

const GATE_ENV: Record<AuthGate, string | undefined> = {
  personal: process.env.PORTFOLIO_PERSONAL_PASSWORD,
  employer: process.env.PORTFOLIO_EMPLOYER_PASSWORD,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, gate = "personal" } = body as {
      password?: unknown;
      gate?: AuthGate;
    };

    const area: AuthGate =
      gate === "employer" ? "employer" : "personal";
    const expectedPassword = GATE_ENV[area];
    const secret = process.env.JWT_SECRET;

    if (!expectedPassword || !secret) {
      console.error(`Missing password env for gate "${area}" or JWT_SECRET`);
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (typeof password !== "string" || password !== expectedPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await new SignJWT({ access: area })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(TOKEN_EXPIRY)
      .setIssuedAt()
      .sign(new TextEncoder().encode(secret));

    return NextResponse.json({ token });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
