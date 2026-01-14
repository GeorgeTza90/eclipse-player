import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("artists", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.text("description").nullable();
    table.json("media").nullable();
    table.string("image_url").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("artists");
}
