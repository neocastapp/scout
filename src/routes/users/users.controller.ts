import { Request, Response } from "express";
import { db } from "../../utilities/mongo";

export default class ContractsController {
  public GetNotificationsByWallet = async (req: Request, res: Response) => {
    try {
      const { ack, filter } = req.query;

      let query: any = {};
      if (ack == undefined) {
        query = {};
      } else if (ack == "true") {
        query = { "notifications.ack": true };
      } else {
        query = { "notifications.ack": false };
      }

      if (filter) {
        query = { filter };
      }

      const data = await db
        .collection("subscriptions")
        .aggregate([
          {
            $match: {
              wallet: req.params.wallet,
            },
          },
          {
            $lookup: {
              from: "notifications",
              localField: "topic_name",
              foreignField: "topic_name",
              as: "notifications",
            },
          },
          {
            $unwind: {
              path: "$notifications",
            },
          },
          {
            $match: query,
          },
          {
            $project: {
              _id: 0,
              topic_name: 1,
              notifications: 1,
            },
          },
        ])
        .toArray();
      console.log(data);
      res.status(200).send({
        success: true,
        data: data,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };
  public GetSubscriptionsByWallet = async (req: Request, res: Response) => {
    try {
      const data = await db
        .collection("subscriptions")
        .aggregate([
          {
            $match: {
              wallet: req.params.wallet,
            },
          },
          {
            $lookup: {
              from: "topics",
              localField: "topic_name",
              foreignField: "topic_name",
              as: "topic",
            },
          },
          {
            $unwind: {
              path: "$topic",
            },
          },
        ])
        .toArray();
      console.log(data);
      res.status(200).send({
        success: true,
        data: data,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };
}
