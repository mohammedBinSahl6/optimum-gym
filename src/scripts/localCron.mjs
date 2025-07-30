import cron from "node-cron";
import { checkAndUpdateExpiredMemberships } from "../lib/cron/checkMembershipExpiration";

// Run every minute for testing (change to "0 0 * * *" for daily)
cron.schedule("0 0 * * *", async () => {
  console.log("Running membership expiration check...");
  await checkAndUpdateExpiredMemberships();
});

console.log("Local cron job scheduler running...");
