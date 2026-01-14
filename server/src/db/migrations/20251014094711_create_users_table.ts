import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("username").notNullable();
    table.string("email").unique().notNullable();
    table.string("password").nullable();
    table.boolean("premium").defaultTo(false);
    table.string("google_id").unique().nullable();
    table.string("avatar_url").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
