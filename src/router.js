const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

const signingSecret = mockUser.password
console.log('sign', signingSecret);

router.post('/register', (req, res) => {
    console.log('req', req.body);
    const { username, password } = req.body

    const token = jwt.sign({ id: 41, username }, 'greatpass')

    res.json(token)
    console.log('token', token);
    console.log('user', username);
    console.log('user', password);
})

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username) {
    const token = jwt.sign({ username }, signingSecret);
    return res.json(token);
  } else {
    return res.status(404).json({ error: "uggghh" });
  }
});

router.get("/profile", (req, res) => {
  console.log("req", req.headers);
  console.log(req.get("authorization"));

  const token = req.get("authorization");
  console.log("token", token);

  try {
    const decode = jwt.verify(token, signingSecret);
    res.json(mockUser);

  } catch (err) {
    res.status(500).json({ error: "damn it" });
  }
});

module.exports = router;
