CREATE TABLE IF NOT EXISTS Contacts
(
    id        INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    contact   VARCHAR(255) NOT NULL,
    name      VARCHAR(255) NOT NULL,
    content   MEDIUMTEXT   NOT NULL,
    isRead    TINYINT      NOT NULL DEFAULT 0,
    createdAt TIMESTAMP    NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP
);

CREATE TABLE IF NOT EXISTS States
(
    id           INT                 NOT NULL PRIMARY KEY,
    name         VARCHAR(255) UNIQUE NOT NULL,
    abbreviation VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Cities
(
    id      INT          NOT NULL PRIMARY KEY,
    name    VARCHAR(255) NOT NULL,
    stateId INT          NOT NULL,
    FOREIGN KEY (stateId) REFERENCES States (id)
);

CREATE TABLE IF NOT EXISTS Girls
(
    id              INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    displayName     VARCHAR(255) NOT NULL,
    title           VARCHAR(255) NOT NULL,
    age             INT          NOT NULL,
    weight          FLOAT        NOT NULL,
    height          FLOAT        NOT NULL,
    neighborhood    VARCHAR(255) NOT NULL,
    instagram       VARCHAR(255)          DEFAULT null,
    facebook        VARCHAR(255)          DEFAULT null,
    email           VARCHAR(255)          DEFAULT null,
    whatsApp        VARCHAR(255)          DEFAULT null,
    phone           VARCHAR(255)          DEFAULT null,
    publicType      VARCHAR(255) NOT NULL,
    halfAnHourValue INT          NOT NULL,
    hourValue       INT          NOT NULL,
    payment         VARCHAR(255) NOT NULL,
    place           VARCHAR(255) NOT NULL,
    details         MEDIUMTEXT,
    isActive        TINYINT      NOT NULL DEFAULT 1,
    createdAt       TIMESTAMP    NOT NULL DEFAULT NOW(),
    updatedAt       TIMESTAMP,
    cityId          INT          NOT NULL,
    FOREIGN KEY (cityId) REFERENCES Cities (id)
);

CREATE TABLE IF NOT EXISTS Comments
(
    id         INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title      VARCHAR(255) NOT NULL,
    content    MEDIUMTEXT   NOT NULL,
    isActive   TINYINT      NOT NULL DEFAULT 1,
    isApproved TINYINT      NOT NULL DEFAULT 0,
    createdAt  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updatedAt  TIMESTAMP,
    girlId     INT          NOT NULL,
    FOREIGN KEY (girlId) REFERENCES Girls (id)
);

CREATE TABLE IF NOT EXISTS GirlImages
(
    id       INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    girlId   INT          NOT NULL,
    FOREIGN KEY (girlId) REFERENCES Girls (id)
);