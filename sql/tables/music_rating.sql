CREATE TABLE music_rating
(
    id          SERIAL PRIMARY KEY,
    job_id      INTEGER              NOT NULL,
    title       TEXT                 NOT NULL,
    score       INTEGER              NOT NULL,
    difficulty  std_chart_difficulty NOT NULL,
    rating_type rating_type          NOT NULL,
    music_order INTEGER              NOT NULL,
    level       DECIMAL              NOT NULL,
    rank        play_result_rank     NOT NULL,
    rating      DECIMAL              NOT NULL
);

GRANT USAGE ON SEQUENCE music_rating_id_seq TO localuser;
