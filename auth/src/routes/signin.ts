import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { validateRequest,BadRequestError  } from "@iyoungman/common";
import { Password } from "../services/password";
const router = express.Router();

router.post(
  "/api/users/signin",
  // do validation
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  // get the validation result and return it
  validateRequest,
  // if the form is validated, check if the user exist
  // by searching email and compare the password
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if(!passwordsMatch){
      throw new BadRequestError("Invalid credentials");
    }

    // generate the jwt 
    const userJwt = jwt.sign(
      // the information 
      {
        id:existingUser.id,
        email:existingUser.email,
      },
      // privateKey on different microservices
      process.env.JWT_KEY!
    );
    // Store it on session object
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existingUser);

  }
);

export { router as signinRouter };
