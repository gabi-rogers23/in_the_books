const jwt = require("jsonwebtoken");
const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");

const { createUser,
    updateUser,
    getUser,
    getUserByEmail,
    getAllUsers } = require("../database/users");
    
const SALT_COUNT = 10;
const { JWT_SECRET = "neverTell" } = process.env;

    usersRouter.post("/register", async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const queriedUser = await getUserByEmail(email);
    
        if (queriedUser) {
          res.status(401);
          next({
            name: "Error",
            message: `The E-mail ${email} already exists.`,
          });
          return;
    
        } else if (password.length < 8) {
          res.status(401);
          next({
            name: "PasswordLengthError",
            message: "Password Too Short!",
          });
          return;
    
        } else {
          const user = await createUser({
            email,
            password,
          });
          if (!user) {
            next({
              name: "UserCreationError",
              message: "There was a problem registering you. Please try again.",
            });
          } else {
            const token = jwt.sign(
              { id: user.id, email: user.email },
              JWT_SECRET,
              { expiresIn: "1w" }
            );
            res.send({ user, message: "you're signed up!", token });
          }
        }
      } catch (error) {
        next(error);
      }
    });
    
      
      usersRouter.post("/login", async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
          res.status(401);
          next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password",
          });
        }
      
        try {
          const user = await getUser({ email, password });
          if (user) {
            const token = jwt.sign(user, process.env.JWT_SECRET);
            res.send({ message: "you're logged in!", token, user });
          } else {
            next({
              name: "IncorrectCredentialsError",
              message: "Username or password is incorrect.",
            });
          }
        } catch (error) {
          next(error);
        }
      });
      
      usersRouter.get('/me', async (req, res, next) => {
        try{
            const auth = req.header('Authorization')
    
            if(!auth) {
            res.status(401)
            next({
            name:"You must be logged in to perform this action",
            message:"You must be logged in to perform this action"
             })
            }
            const token = auth.slice(7)
            console.log('Token is here', token)
            const {username} = jwt.verify(token, JWT_SECRET)
            const gettingUser = await getUserByEmail(username)
            console.log('The user is here', gettingUser)
            res.send(gettingUser)
        } catch(error){
            next(error);
        }
    });
      
    
      module.exports = usersRouter;
      