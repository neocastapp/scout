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

      switch (topic.action.action) {
        case "callDiscordWebhook":
          // Send out a smexy Discord webhook notification
          fetch(topic.webhookURL, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
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
                  description: notification.message,
                },
              ],
            }),
          });

          res.status(200).json({ success: true });
          break;

        case "sendEmail":
          // Send out an email using Brevo
          const options = {
            method: "POST",
            url: "https://api.brevo.com/v3/contacts",
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              "api-key": process.env.NEXT_PUBLIC_BREVO_API_KEY,
            },
            data: {
              attributes: {
                EMAIL: req.query.email,
              },
              updateEnabled: false,
              email: req.query.email,
              listIds: [7],
            },
          };

          axios
            .request(options)
            .then(function (response) {
              console.log(response.data);
              if ("id" in response.data) {
                console.log("success");
              }
            })
            .catch(function (error) {
              console.error(error.response.data.code);
              if (error.response.data.code === "duplicate_parameter") {
                console.log("Already exists");
              }
            });
          break;
      }

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
