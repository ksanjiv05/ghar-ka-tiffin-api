import { NextFunction, Request, Response } from "express";
import { adminApp } from "../firebase";
import logging from "../config/logging";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.header("authorization");
    // console.log("token ", token);
    if (!token)
      return res.status(403).json({ msg: "please provide valid auth token " });
    adminApp
      .auth()
      .verifyIdToken(token)
      .then((claims: any) => {
        // console.log("clams", claims);
        req.body.user = claims;
        next();
      })
      .catch((err: any) => {
        logging.error("Authorization","token err", err);
        return res
          .status(401)
          .json({ msg: "please provide valid auth token " });
      });
  } catch (error) {
    logging.error("Authorization","token error", error);
    return res.status(500).json({ msg: "please provide valid auth token " });
  }
};
