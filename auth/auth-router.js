const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/constants");

const router = require("express").Router();

const usersDB = require("../users/users-model");

router.post("/register", async (req, res) => {
  try {
    const credentials = req.body;
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    console.log(credentials);

    const result = await usersDB.add({ ...credentials, password: hash });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const [user] = await usersDB.findBy({ username });

    if (user && bcryptjs.compareSync(password, user.password)) {
      const token = createToken(user);
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ message: "Failed to login" });
    }
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
