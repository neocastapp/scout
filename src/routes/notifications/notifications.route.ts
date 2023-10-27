import { Router } from "express";
import Controller from "./notifications.controller";

const notifications: Router = Router();
const controller = new Controller();

notifications.post("/:topic_name/new", controller.CreateNotification);
notifications.get(
  "/topic/:topic_name",
  controller.GetAllNotificationsByTopicId
);
notifications.get("/:notificationId", controller.GetNotification);

export default notifications;
