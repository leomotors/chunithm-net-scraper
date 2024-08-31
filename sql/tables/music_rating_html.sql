CREATE TABLE music_rating_html
(
    id             SERIAL PRIMARY KEY,
    job_id         INTEGER NOT NULL,
    best_html      TEXT    NOT NULL,
    recent_html    TEXT    NOT NULL,
    selection_html TEXT    NOT NULL
);

GRANT USAGE ON SEQUENCE music_rating_html_id_seq TO localuser;
