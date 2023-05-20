CREATE TABLE "tasks" ("id" SERIAL PRIMARY KEY, "name" VARCHAR(250) NOT NULL, "done" BOOLEAN DEFAULT FALSE, "timestamp" TIMESTAMP);

INSERT INTO "tasks" ("name") VALUES ('gardening'), ('petting cat'), ('feeding cat'), ('shopping');

DROP TABLE "tasks";

DELETE FROM "tasks";

