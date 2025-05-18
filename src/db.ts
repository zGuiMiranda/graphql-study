import knex from "knex";

export const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./dev.db",
  },
  useNullAsDefault: true,
});

db.schema.hasTable("users").then((exists) => {
  if (!exists) {
    return db.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("email");
    });
  }
});

db.schema.hasTable("posts").then((exists) => {
  if (!exists) {
    return db.schema.createTable("posts", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.integer("userId").references("id").inTable("users");
    });
  }
});
