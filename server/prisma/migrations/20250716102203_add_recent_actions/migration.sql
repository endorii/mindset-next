-- CreateTable
CREATE TABLE "RecentAction" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RecentAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecentAction" ADD CONSTRAINT "RecentAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
