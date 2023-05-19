CREATE TABLE "tasks" ("id" SERIAL PRIMARY KEY, "name" VARCHAR(250) NOT NULL, "done" BOOLEAN DEFAULT FALSE);

INSERT INTO "tasks" ("name") VALUES ('gardening'), ('petting cat'), ('feeding cat'), ('shopping');
