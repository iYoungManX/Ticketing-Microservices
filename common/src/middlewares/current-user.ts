//////////////////////////////////////////////////////////////////////////////////
///   If there is a jwt token, transfer and store it in currentUser        ///////
//////////////////////////////////////////////////////////////////////////////////
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
 
interface UserPayload{
  id:string;
  email:string;
}
// add a addtional properties of currentUser to Request
declare global{
  namespace Express{
    interface Request{
      currentUser?:UserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // no jwt? next
  if (!req.session?.jwt) {
    return next();
  }
  // verify jwt with the JWT_KEY
  // return the payload as currentUser in the req
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
