const jwt = require("jsonwebtoken");
const express = require("express");
const usersRouter = express.Router();
const { getUserByEmail, createUser, getUser } = require("../database")

    
const SALT_COUNT = 10;

    usersRouter.post("/register", async (req, res, next) => {
      try {
        const { email, password, firstName, lastName, shippingAddress, phoneNumber } = req.body;
      
        const queriedUser = await getUserByEmail(email);
    // console.log("quaried user", queriedUser)
        if (queriedUser) {
          res.status(401).send({
            error: "ERROR",
            name: "Error",
            message: `The E-mail ${email} already exists.`,
          });
        
    
        } else if (password.length < 8) {
          res.status(401).send({
            error: "ERROR",
            name: "PasswordLengthError",
            message: "Password Too Short!",
          });
          
    
        } else {
        let isAdmin = false
          const user = await createUser({
            email,
            password,
            firstName,
            lastName,
            shippingAddress,
            phoneNumber, isAdmin
          });
          if (!user) {
            res.status(401).send({
              error: "ERROR",
              name: "UserCreationError",
              message: "There was a problem registering you. Please try again.",
            });
          } else {
            const token = jwt.sign(
              { id: user.id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: "1w" }
            );
            res.send({ user, message: "You've successfully registered!  Thanks!", token });
          }
        }
      } catch (error) {
        next(error);
      }
    });
    
      
      usersRouter.post("/login", async (req, res, next) => {
        const { email, password } = req.body;
        // console.log(email)
        if (!email || !password) {
          res.status(401).send({
            error: "ERROR",
            name: "MissingCredentialsError",
            message: "Please supply both a email and password",
          });
        }
      
        try {
          const user = await getUser(req.body);
          // console.log("POST user", user)
          if (user) {
            const token = jwt.sign(user, process.env.JWT_SECRET);
            res.send({ message: "you're logged in!", token: token, user: user });
          } else {
            res.send({
              error: "ERROR",
              name: "IncorrectCredentialsError",
              message: "Email or password is incorrect.",
            });
          }
        } catch (error) {
          next(error);
        }
      });
      
      usersRouter.get('/me', async (req, res, next) => {
        try {
          const auth = req.headers.authorization;
          if (auth) {
            console.log(req.user)
            res.send(req.user);
          } else {
            res.status(401).send({
              error: "No Token",
              message: `You must be logged in to perform this action`,
              name: "No User Token",
            });
          }
        } catch (error) {
          next(error);
        }
      });
      
    
      module.exports = usersRouter;
      