-- CreateEnum
CREATE TYPE "role" AS ENUM ('User', 'SuperAdmin');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "bonus_balance" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT,
    "avatar" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "user_id" TEXT NOT NULL,
    "role" "role" NOT NULL,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("user_id","role")
);

-- CreateTable
CREATE TABLE "product_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "product_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "brandName" TEXT NOT NULL,
    "productCode" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "additionalImageUrls" TEXT[],
    "product_type_id" TEXT NOT NULL,
    "product_category_id" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE INDEX "user_role_user_id_idx" ON "user_role" USING HASH ("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_type_slug_key" ON "product_type"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "product_category_slug_key" ON "product_category"("slug");

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
