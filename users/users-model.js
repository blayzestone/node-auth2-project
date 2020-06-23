const db = require("../database/connection");

module.exports = {
  add,
  find,
  findBy,
};

function add(user) {
  return db("user").insert(user);
}

function find() {
  return db("user").select("*");
}

function findBy(filter) {
  return db("user").select("*").where(filter);
}
