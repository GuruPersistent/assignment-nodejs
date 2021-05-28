const express = require("express");
require("dotenv").config();
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./utils/passport");
const isLoggedIn = require("./middleware/auth");

app.use(
  cookieSession({
    name: "spotify-auth-session",
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", isLoggedIn, (req, res) => {
  res.send({use:req.user});
});

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.get("/error", (req, res) => res.status(401).send("Unknown Error"));

app.get("/login", passport.authenticate("spotify"));

app.get(
  "/callback",
  passport.authenticate("spotify", { failureRedirect: "/error" }),
  function (req, res) {
    res.redirect("/");
  }
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server running at port " + PORT);
});
