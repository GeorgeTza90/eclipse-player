import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("eq_presets", (table) => {
    table.increments("id");
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.string("title").notNullable();
    table.tinyint("is_public").nullable()
    table.string("preset").nullable();
    table.timestamps(true, true);    
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("eq_presets");
}
