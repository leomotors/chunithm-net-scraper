ALTER TABLE music_rating
    ADD CONSTRAINT unique_music_rating_job_id_and_rating_type_and_music_order
        UNIQUE (job_id, rating_type, music_order);
