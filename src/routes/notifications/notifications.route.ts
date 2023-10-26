import { Router } from "express";
import Controller from "./notifications.controller";

const notifications: Router = Router();
const controller = new Controller();

notifications.post("/:topicId/new", controller.CreateNotification);
notifications.get("/:topicId", controller.GetAllNotificationsByTopicId);
notifications.get("/:notificationId", controller.GetNotification);

export default notifications;
