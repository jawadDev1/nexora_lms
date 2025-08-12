/*
  Warnings:

  - You are about to drop the column `comment` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `Reply` table. All the data in the column will be lost.
  - Added the required column `reply` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Reply" DROP CONSTRAINT "Reply_reviewId_fkey";

-- AlterTable
ALTER TABLE "public"."Question" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Reply" DROP COLUMN "comment",
DROP COLUMN "reviewId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "questionId" TEXT,
ADD COLUMN     "reply" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Reply" ADD CONSTRAINT "Reply_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reply" ADD CONSTRAINT "Reply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
