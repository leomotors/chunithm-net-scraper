CREATE TABLE job (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL
);

GRANT USAGE ON SEQUENCE job_id_seq TO localuser;
