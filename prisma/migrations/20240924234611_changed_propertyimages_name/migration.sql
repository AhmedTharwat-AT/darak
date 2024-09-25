/*
  Warnings:

  - You are about to drop the `PropertyImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PropertyImages";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PropertyImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "properityId" TEXT NOT NULL,
    CONSTRAINT "PropertyImage_properityId_fkey" FOREIGN KEY ("properityId") REFERENCES "Properties" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Properties" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "space" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Properties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Properties" ("bathrooms", "createdAt", "description", "id", "location", "mode", "ownerId", "price", "rooms", "space", "title", "type", "updatedAt") SELECT "bathrooms", "createdAt", "description", "id", "location", "mode", "ownerId", "price", "rooms", "space", "title", "type", "updatedAt" FROM "Properties";
DROP TABLE "Properties";
ALTER TABLE "new_Properties" RENAME TO "Properties";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
