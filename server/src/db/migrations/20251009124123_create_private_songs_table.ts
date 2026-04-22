import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("private_songs", (table) => {
    table.increments("id");
    table.string("title").notNullable();
    table.string("artist").notNullable();
    table.string("album").nullable();
    table.integer("year").nullable();
    table.string("image").nullable();
    table.string("url").nullable();
    table.string("type").nullable();
    table.integer("duration").nullable();
    table.string("averageColor").nullable();
    table.string("urlHD").nullable();
    table.text("lyrics").nullable();
    table.string("feature").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("private_songs");
}
