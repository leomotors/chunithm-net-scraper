ALTER TABLE music_rating
    ADD CONSTRAINT unique_music_rating_job_id_and_rating_type_and_rank
        UNIQUE (job_id, rating_type, rank);
