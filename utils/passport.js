const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENTID,
      clientSecret: process.env.SPOTIFY_CLIENTSECRET,
      callbackURL: process.env.SPOTIFY_CALLBACKURL,
    },
    function (accessToken, refreshToken, profile, done) {
      profile.accessToken = accessToken;
      return done(null, profile);
    }
  )
);
