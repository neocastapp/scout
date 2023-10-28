import { Router } from "express";
import Controller from "./users.controller";

const users: Router = Router();
const controller = new Controller();

users.get("/notifications/:wallet", controller.GetNotificationsByWallet);
users.get("/subscriptions/:wallet", controller.GetSubscriptionsByWallet);

export default users;
