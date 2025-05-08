-- DropIndex
DROP INDEX "Stats_platformId_key";

-- CreateIndex
CREATE INDEX "Stats_platformId_date_idx" ON "Stats"("platformId", "date");
