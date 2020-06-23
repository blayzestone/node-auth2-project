const router = require("express").Router();
const usersDB = require("./users-model");

router.get("/", async (req, res) => {
  try {
    const users = await usersDB.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
