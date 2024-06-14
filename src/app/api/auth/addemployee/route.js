import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    return NextResponse.json({ message: "added employee" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
