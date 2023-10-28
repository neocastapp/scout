import { Router } from "express";
import Controller from "./notifications.controller";

const notifications: Router = Router();
const controller = new Controller();

notifications.post("/:topic_name/new", controller.CreateNotification);
notifications.get(
  "/topic/:topic_name",
  controller.GetAllNotificationsByTopicId
);
notifications.put("/:notificationId", controller.AckNotification);
notifications.get("/:notificationId", controller.GetNotification);
notifications.get("/", controller.GetAllNotifications);

export default notifications;
