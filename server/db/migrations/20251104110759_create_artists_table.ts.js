exports.up = function(knex) {
  return knex.schema.createTable('artists', function(table) {
    table.increments('id');    
    table.string('name').notNullable();
    table.text('description');
    table.json('media');
    table.string('image_url');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('artists');
};
