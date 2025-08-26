import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get("secret");
    const path = req.nextUrl.searchParams.get("path");

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (!path) return NextResponse.json({ message: "Missing path" }, { status: 400 });

    revalidatePath(path);

    return NextResponse.json({ revalidated: true, path });
}
