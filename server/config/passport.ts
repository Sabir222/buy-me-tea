import prisma from "../libs/prismadb";
const LocalStrategy = require("passport-local").Strategy;
// const passport = require("passport");
//import passport from "passport";
import passport from 'passport';
const bcrypt = require("bcrypt");

/*
 *
 */
const User = prisma.user;
const verifyCallback = async (email: string, password: string, done: any) => {
  console.log("Verifying user:", email);
  if (!email || !password) return done(null, false);
  try {
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
const Strategy = new LocalStrategy(verifyCallback);
passport.use(Strategy);

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});
passport.deserializeUser((id: any, done: any) => {
  User.findUnique({ where: { id: id } }).then((user) => {
    done(null, user).catch((err: any) => done(err));
  });
});
export default passport;
