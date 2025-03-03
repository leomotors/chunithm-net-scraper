CREATE TABLE "qman_raw" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_id" integer NOT NULL,
	"raw" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "qman_raw" ADD CONSTRAINT "qman_raw_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "chart_score" ADD CONSTRAINT "chart_score_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "music_rating_html" ADD CONSTRAINT "music_rating_html_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE cascade ON UPDATE cascade;