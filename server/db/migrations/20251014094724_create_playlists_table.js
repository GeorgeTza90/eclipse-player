exports.up = function(knex) {
  return knex.schema.createTable('playlists', function(table) {
    table.increments('id');
    table.integer('user_id').unsigned().notNullable()
         .references('id').inTable('users')
         .onDelete('CASCADE'); // αν διαγραφεί user, διαγράφονται και οι playlists
    table.string('title').notNullable();
    table.text('description'); // προαιρετικό
    table.boolean('is_public').defaultTo(false);
    table.string('cover_image_url'); // optional
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('playlists');
};
