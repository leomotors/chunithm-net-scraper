ALTER TABLE "music_rating" DROP CONSTRAINT "unique_music_rating_job_id_and_rating_type_and_music_order";--> statement-breakpoint
ALTER TABLE "chart_constant" DROP CONSTRAINT "chart_constant_title_difficulty_version_key";--> statement-breakpoint
ALTER TABLE "chart_score" DROP CONSTRAINT "chart_score_title_difficulty_score_fc_aj_key";--> statement-breakpoint
ALTER TABLE "music_rating" DROP CONSTRAINT "fk_music_rating_job_id_job";
--> statement-breakpoint
ALTER TABLE "player_data" DROP CONSTRAINT "fk_player_data_job_id_job";
--> statement-breakpoint
ALTER TABLE "chart_score" ALTER COLUMN "clear_mark" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "music_rating" ADD CONSTRAINT "music_rating_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "player_data" ADD CONSTRAINT "player_data_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "music_rating" ADD CONSTRAINT "music_rating_job_id_rating_type_music_order_unique" UNIQUE("job_id","rating_type","music_order");--> statement-breakpoint
ALTER TABLE "chart_constant" ADD CONSTRAINT "chart_constant_title_difficulty_version_unique" UNIQUE("title","difficulty","version");--> statement-breakpoint
ALTER TABLE "chart_score" ADD CONSTRAINT "chart_score_title_difficulty_score_fc_aj_clear_mark_full_chain_unique" UNIQUE("title","difficulty","score","fc","aj","clear_mark","full_chain");--> statement-breakpoint
ALTER TABLE "public"."chart_score" ALTER COLUMN "clear_mark" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."clear_mark";--> statement-breakpoint
CREATE TYPE "public"."clear_mark" AS ENUM('NONE', 'CLEAR', 'HARD', 'ABSOLUTE', 'ABSOLUTE+', 'CATASTROPHY');--> statement-breakpoint
ALTER TABLE "public"."chart_score" ALTER COLUMN "clear_mark" SET DATA TYPE "public"."clear_mark" USING "clear_mark"::"public"."clear_mark";