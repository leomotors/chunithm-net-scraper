ALTER TABLE music_rating
    ADD CONSTRAINT fk_music_rating_job_id_job
        FOREIGN KEY (job_id)
            REFERENCES job (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;
