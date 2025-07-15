// app/api/cron/route.ts
import { NextResponse } from "next/server";
import { checkAndUpdateExpiredMemberships } from "@/lib/cron/checkMembershipExpiration";

export async function GET() {
  try {
    const result = await checkAndUpdateExpiredMemberships();
    return NextResponse.json({
      success: true,
      expiredCount: result.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error },
      { status: 500 }
    );
  }
}
