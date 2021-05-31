const express = require("express");
require("dotenv").config();
const app = express();
const cookieSession = require("cookie-session");
const axios = require("axios");
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
  res.send({ use: req.user });
});

app.get("/api/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.get("/api/error", (req, res) => res.status(401).send("Unknown Error"));

app.get("/api/login", passport.authenticate("spotify"));

app.get("/api/artists/:query", async (req, res) => {
  try {
    let info = await axios.get(
      `https://api.spotify.com/v1/search?q=${req.params.query}&type=artist&limit=10`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + req.user.accessToken,
        },
      }
    );
    res.send({ artists: info.data });
  } catch (error) {
    res.redirect("/");
  }
});

app.get("/api/artists/albums/:id", async (req, res) => {
  try {
    let info = await axios.get(
      `https://api.spotify.com/v1/artists/${req.params.id}/albums?limit=10`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + req.user.accessToken,
        },
      }
    );
    res.send({ albums: info.data });
  } catch (error) {
    res.redirect("/");
  }
});

app.get("/api/artists/albums/songs/:id", async (req, res) => {
  try {
    let info = await axios.get(
      `https://api.spotify.com/v1/albums/${req.params.id}/tracks`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + req.user.accessToken,
        },
      }
    );
    res.send({ songs: info.data });
  } catch (error) {
    res.redirect("/");
  }
});

app.get(
  "/callback",
  passport.authenticate("spotify", { failureRedirect: "/api/error" }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URL + "/dashboard");
  }
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server running at port " + PORT);
});
