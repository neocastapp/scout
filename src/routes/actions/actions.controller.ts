import { Request, Response } from "express";
import { db } from "../../utilities/mongo";
import { ObjectId } from "mongodb";
import axios from "axios";

export default class Controller {
  public doAutomation = async (req: Request, res: Response) => {
    try {
      const { notificationId, topic_name } = req.body;

      const notification = await db
        .collection("notifications")
        .findOne({ _id: new ObjectId(notificationId) });

      const topic = await db
        .collection("topics")
        .findOne({ topic_name: topic_name });

      axios.post(
        topic.webhookURL,
        {
          username: "NeoCast Notifications",
          avatar_url:
            "https://raw.githubusercontent.com/neocastapp/brand/main/512x512_color.png",
          content: "",
          embeds: [
            {
              color: 58777,
              author: {
                name: "Neocast Notifications",
                url: "https://neocast.xyz/",
                icon_url:
                  "https://raw.githubusercontent.com/neocastapp/brand/main/512x512_color.png",
              },
              title: topic.topic_name,
              url: topic.websiteURL,
              description: notification?.message || notification?.eventname,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      res.status(200).json({ success: true });

      try {
        res.status(200).send({
          success: true,
        });
      } catch (e) {
        if (e.code === 11000) {
          // duplicate key error
          res.status(200).send({
            success: false,
            reason: "Action already exists",
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
}
