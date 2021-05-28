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

app.get("/api/", isLoggedIn, (req, res) => {
  res.send({use:req.user});
});

app.get("/api/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.get("/api/error", (req, res) => res.status(401).send("Unknown Error"));

app.get("/api/login", passport.authenticate("spotify"));

app.get(
  "/callback",
  passport.authenticate("spotify", { failureRedirect: "/api/error" }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URL);
  }
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server running at port " + PORT);
});
