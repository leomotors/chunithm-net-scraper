CREATE TABLE player_data
(
    id                SERIAL PRIMARY KEY,
    job_id            INTEGER   NOT NULL,
    current_rating    DECIMAL   NOT NULL,
    max_rating        DECIMAL   NOT NULL,
    overpower_value   DECIMAL   NOT NULL,
    overpower_percent DECIMAL   NOT NULL,
    last_played       TIMESTAMP NOT NULL,
    data_html_raw     TEXT      NOT NULL
);

GRANT USAGE ON SEQUENCE player_data_id_seq TO localuser;
