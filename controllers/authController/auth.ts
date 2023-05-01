import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import logging from "../../config/logging";
import User from "../../models/User";
import { IUser } from "../../interfaces/IUser";
import { adminApp } from "../../firebase";
import { responseObj } from "../../helper/response";
import { HTTP_RESPONSE } from "../../helper/constants";
import { USER_ROLES } from "../../config/enums";

//dep
export const register = async (req: Request, res: Response) => {
  try {
    const {
      email = "",
      emailVerified = false,
      phoneNumber,
      photoURL,
      uid,
      fcmToken = "",
      displayName,
    }: IUser = req.body;
    if (uid === "" || displayName === "")
      return res.status(202).json({
        message: "error",
        discription: "Please provide uid password and name",
      });

    await User.updateOne(
      { uid },
      {
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
        fcmToken,
        displayName,
      },
      { upsert: true }
    );

    res.status(200).json({
      message: "success",
      description: "hey you are successfully registred with us",
    });
  } catch (error) {
    logging.error("Register", "unable to register", error);
    res.status(500).json({
      message: "error",
      error,
    });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const {
      displayName,
      email,
      emailVerified = false,
      photoURL,
      password,
      phoneNumber,
      role = USER_ROLES.DEFAULT,
      isAdminAccess = false,
    }: IUser = req.body;

    const newUserRecord = await getAuth(adminApp).createUser({
      email,
      emailVerified,
      phoneNumber,
      password,
      displayName,
      photoURL,
    });

    if (role != USER_ROLES.DEFAULT)
      await getAuth(adminApp).setCustomUserClaims(newUserRecord.uid, {
        role: role,
        admin: isAdminAccess,
      });

    const isAdded = await addUserToMongoDB({
      ...req.body,
      uid: newUserRecord.uid,
    });

    if (!isAdded) {
      await getAuth(adminApp).deleteUser(newUserRecord.uid);
      return responseObj({
        statusCode: HTTP_RESPONSE.ACCEPTED,
        type: "error",
        msg: "unable to add user to MongoDB",
        error: null,
        resObj: res,
        data: null,
      });
    }

    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "user added successfully ",
      error: null,
      resObj: res,
      data: newUserRecord,
    });
  } catch (error) {
    logging.error("Add User", "unable to add user", error);
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { pageToken } = req.params;
    const usersList = await getAuth(adminApp).listUsers(1000, pageToken);
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "user added successfully ",
      error: null,
      resObj: res,
      data: usersList,
    });
  } catch (err) {
    logging.error("Get Users", "unable to get users", err);
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};

export const getUser = (req: Request, res: Response) => {
  return responseObj({
    statusCode: HTTP_RESPONSE.SUCCESS,
    type: "error",
    msg: "unable to add user to MongoDB",
    error: null,
    resObj: res,
    data: req.body,
  });
};

// to add user to mongo database
const addUserToMongoDB = async (data: IUser) => {
  try {
    const {
      uid,
      displayName,
      email,
      emailVerified = false,
      photoURL,
      password,
      phoneNumber,
      role = USER_ROLES.DEFAULT,
      isAdminAccess = false,
    }: IUser = data;

    await User.updateOne(
      { uid },
      {
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
        displayName,
        role,
        isAdminAccess,
      },
      { upsert: true }
    );
    return true;
  } catch (error) {
    logging.error("Register", "unable to register", error);
    return false;
  }
};
