CREATE TABLE music_rating
(
    id          SERIAL PRIMARY KEY,
    job_id      INTEGER     NOT NULL,
    title       TEXT        NOT NULL,
    score       INTEGER     NOT NULL,
    difficulty  INTEGER     NOT NULL,
    rating_type rating_type NOT NULL,
    rank        INTEGER     NOT NULL
);

GRANT USAGE ON SEQUENCE music_rating_id_seq TO localuser;
