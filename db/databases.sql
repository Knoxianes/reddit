CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    userID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username varchar NOT NULL UNIQUE,
    email varchar NOT NULL UNIQUE
);
CREATE TABLE subreddits(
    subredditID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title varchar NOT NULL unique,
    admin uuid REFERENCES users(userID),
    userIDs uuid[],
    description varchar NOT NULL
);
CREATE TABLE posts(
    postID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    userID uuid REFERENCES users(userID),
    subredditID uuid REFERENCES subreddits(subredditID),
    title varchar NOT NULL,
    body varchar,
    img varchar,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE comments(
    commentID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    postID uuid REFERENCES posts(postID),
    userID uuid REFERENCES users(userID),
    parent_comment uuid REFERENCES comments(commentID),
    body varchar NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE votes(
    voteID uuid PRIMARY KEY  DEFAULT uuid_generate_v4(),
    userID uuid REFERENCES users(userID),
    postID uuid REFERENCES posts(postID),
    value int NOT NULL
);
