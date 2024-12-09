import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function (request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  console.log(secret);

  // Check for secret to confirm this is a valid request
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    revalidatePath("/", "layout");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
};
