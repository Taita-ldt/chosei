---- drop ----
DROP TABLE IF EXISTS chousei_user;
DROP TABLE IF EXISTS candidate_dates;
DROP TABLE IF EXISTS candidate_date_status;
DROP TABLE IF EXISTS lottery_status;

---- create ----
create table IF not exists chousei_user
(
 id               SERIAL,
 name             VARCHAR NOT NULL,
 created_at       timestamp DEFAULT NULL,
 updated_at       timestamp DEFAULT NULL,
    PRIMARY KEY (id)
);
create table IF not exists candidate_date
(
 id               SERIAL,
 candidate_month   VARCHAR NOT NULL,
 candidate_date   timestamp NOT NULL,
 created_at       timestamp DEFAULT NULL,
 updated_at       timestamp DEFAULT NULL,
    PRIMARY KEY (id)
);
create table IF not exists candidate_date_status
(
 id               SERIAL,
 user_id          INT NOT NULL,
 candidate_date_id INT NOT NULL,
 status           INT NOT NULL,
 created_at       timestamp DEFAULT NULL,
 updated_at       timestamp DEFAULT NULL,
    PRIMARY KEY (id)
);

-- 日比谷公園の抽選状況が格納される。
create table IF not exists lottery_status
(
 id               SERIAL,
 candidate_date_id INT NOT NULL,
 candidate_time_from    timestamp NOT NULL,
 candidate_time_to    timestamp NOT NULL,
 lottery_status    VARCHAR NOT NULL,
 created_at       timestamp DEFAULT NULL,
 updated_at       timestamp DEFAULT NULL,
    PRIMARY KEY (id)
);