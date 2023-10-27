import { Request, Response } from "express";
import { db } from "../../utilities/mongo";

export default class NotificationsController {
  public CreateNotification = async (req: Request, res: Response) => {
    try {
      const notification_data = req.body;

      try {
        const data = await db.collection("notifications").insertOne({
          topic_name: notification_data.topic_name,
        });

        res.status(200).send({
          success: true,
          data,
        });
      } catch (e) {
        if (e.code === 11000) {
          // duplicate key error
          res.status(200).send({
            success: false,
            reason: "Notification already exists",
          });
        }
      }
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };

  public GetAllNotificationsByTopicId = async (req: Request, res: Response) => {
    try {
      console.log(req.params.topic_name);
      const data = await db
        .collection("notifications")
        .find({
          topic_name: req.params.topic_name,
        })
        .toArray();
      res.status(200).send({
        success: true,
        data: data,
        topic_name: req.params.topic_name,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };

  public GetNotification = async (req: Request, res: Response) => {
    try {
      const notificationId = req.params.notificationId;
      const notification = await db
        .collection("notifications")
        .findOne({ notificationId });

      if (notification) {
        res.status(200).send({
          success: true,
          data: notification,
        });
      } else {
        res.status(404).send({
          success: false,
          reason: "Notification not found",
        });
      }
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };
}
