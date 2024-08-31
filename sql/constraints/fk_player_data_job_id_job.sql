ALTER TABLE player_data
    ADD CONSTRAINT fk_player_data_job_id_job
        FOREIGN KEY (job_id)
            REFERENCES job (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;
