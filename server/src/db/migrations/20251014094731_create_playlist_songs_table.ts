import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("playlist_songs", (table) => {
    table.increments("id");
    table
      .integer("playlist_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("playlists")
      .onDelete("CASCADE");
    table
      .integer("song_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("songs")
      .onDelete("CASCADE");
    table.integer("order").unsigned().defaultTo(0);
    table.timestamps(true, true);

    table.unique(["playlist_id", "song_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("playlist_songs");}