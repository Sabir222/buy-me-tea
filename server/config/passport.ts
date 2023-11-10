import prisma from "../libs/prismadb";
const LocalStrategy = require("passport-local").Strategy;
// const passport = require("passport");
//import passport from "passport";
import passport from "passport";
const bcrypt = require("bcrypt");

/*
 *
 */

const customFields = {
  usernameField: "email",
  passwordField: "password",
};
const user = prisma.user;
const verifyCallback = async (email: string, password: string, done: any) => {
  console.log("Verify callback initiated");
  if (!email || !password) return done(null, false);
  try {
    console.log("verifyCallback is running and Verifying user:", email);
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user || !user.encryptedPassword) {
      return done(null, false);
    }
    const isCorrectPassword = await bcrypt.compare(
      password,
      user.encryptedPassword
    );

    if (!isCorrectPassword) return done(null, false);

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};
const Strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(Strategy);

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});
passport.deserializeUser((id: any, done: any) => {
  user
    .findUnique({ where: { id: id } })
    .then((user) => {
      done(null, user);
    })
    .catch((err: any) => done(err));
});
export default passport;
