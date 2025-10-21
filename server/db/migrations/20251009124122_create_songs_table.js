exports.up = function(knex) {
  return knex.schema.createTable('songs', function(table) {
    table.increments('id');
    table.string('title').notNullable();
    table.string('artist').notNullable();
    table.string('album');
    table.integer('year');
    table.string('image');
    table.string('url');
    table.string('type');
    table.integer('duration');
    table.string('averageColor');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('songs');
};
