ALTER TABLE "notes" ALTER COLUMN "tags" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "tags" SET DEFAULT '[]'::jsonb;