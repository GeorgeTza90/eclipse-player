exports.up = function(knex) {
  return knex.schema.createTable('playlist_songs', function(table) {
    table.increments('id');
    table.integer('playlist_id').unsigned().notNullable()
         .references('id').inTable('playlists')
         .onDelete('CASCADE');
    table.integer('song_id').unsigned().notNullable()
         .references('id').inTable('songs')
         .onDelete('CASCADE');
    table.integer('order').unsigned().defaultTo(0); // θέση τραγουδιού στην playlist
    table.timestamps(true, true);
    
    table.unique(['playlist_id', 'song_id']); // αποφυγή διπλοεγγραφών
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('playlist_songs');
};
