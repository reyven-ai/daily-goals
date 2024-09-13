-- DropForeignKey
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_folderId_fkey";

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
