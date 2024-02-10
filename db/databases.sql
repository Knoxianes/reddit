CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    userID uuid PRIMARY KEY,
    username varchar NOT NULL UNIQUE,
    email varchar NOT NULL UNIQUE
);
CREATE TABLE subreddits(
    subredditID uuid PRIMARY KEY,
    title varchar NOT NULL unique,
    users uuid[],
    description varchar NOT NULL
);
CREATE TABLE posts(
    postID uuid PRIMARY KEY,
    userID uuid REFERENCES users(userID),
    subredditID uuid REFERENCES subreddits(subredditID),
    title varchar NOT NULL,
    body varchar,
    img varchar,
    date int8 NOT NULL
);
CREATE TABLE comments(
    commentID uuid PRIMARY KEY,
    postID uuid REFERENCES posts(postID),
    userID uuid REFERENCES users(userID),
    body varchar NOT NULL,
    date int8 NOT NULL
);
CREATE TABLE replies(
    replayID uuid PRIMARY KEY,
    commentID uuid NOT NULL,
    userID uuid REFERENCES users(userID),
    body varchar NOT NULL,
    date int8 NOT NULL
);
CREATE TABLE votes(
    userID uuid REFERENCES users(userID),
    postID uuid REFERENCES posts(postID),
    value int NOT NULL
);
