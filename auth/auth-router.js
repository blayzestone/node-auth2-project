const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/constants");

const router = require("express").Router();

const usersDB = require("../users/users-model");

router.post("/register", async (req, res) => {
  try {
    const credentials = req.body;
    const result = await usersDB.add(credentials);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const [user] = await usersDB.findBy({ username });
    const token = createToken(user);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ err });
  }
});

function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };
  const options = {
    expiresIn: "6h",
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
