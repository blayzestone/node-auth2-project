exports.up = function (knex) {
  return knex.schema.createTable("user", (tbl) => {
    tbl.increments();

    tbl.string("username", 128).notNullable().unique();
    tbl.string("password", 128).notNullable();

    tbl.string("department", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user");
};
