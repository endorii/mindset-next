-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('mono', 'liqpay');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'mono';
