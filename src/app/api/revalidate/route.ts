import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  console.log("revalidate route : ", secret);
  console.log("request url : ", request.url);

  // Get the host from the headers
  const host = request.headers.get("host");

  // Get the origin from the headers
  const origin = request.headers.get("origin");

  console.log("host : ", host);
  console.log("origin : ", origin);

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
