exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id');
        table.string('username').notNullable();
        table.string('email').unique().notNullable();
        table.string('password'); // optional για non-Google accounts
        table.boolean('premium').defaultTo(false);
        table.string('google_id').unique(); // null αν δεν είναι google user
        table.string('avatar_url'); // profile picture από Google
        table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };