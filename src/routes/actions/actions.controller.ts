import { Request, Response } from "express";
import { db } from "../../utilities/mongo";

export default class Controller {
  public CreateAction = async (req: Request, res: Response) => {
    try {
      const topic_data = req.body;

      try {
        const data = await db.collection("topics").insertOne({
          topic_data,
        });

        const topic = await db
          .collection("topics")
          .findOne({ _id: data.insertedId });

        res.status(200).send({
          success: true,
          data: topic,
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

  public GetAllActions = async (req: Request, res: Response) => {
    try {
      const data = await db.collection("topics").find({}).toArray();
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

  public GetAction = async (req: Request, res: Response) => {
    try {
      const topic_name = req.params.topic_name;
      const topic = await db.collection("topics").findOne({ topic_name });

      if (topic) {
        res.status(200).send({
          success: true,
          data: topic,
        });
      } else {
        res.status(404).send({
          success: false,
          reason: "Action not found",
        });
      }
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };

  public UpdateAction = async (req: Request, res: Response) => {
    try {
      const topic_name = req.params.topic_name;
      const topic_data = req.body;

      const data = await db
        .collection("topics")
        .updateOne({ topic_name }, { $set: { topic_data } });

      const topic = await db.collection("topics").findOne({ topic_name });

      res.status(200).send({
        success: true,
        data: topic,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };

  public RemoveAction = async (req: Request, res: Response) => {
    try {
      const topic_name = req.params.topic_name;

      const data = await db.collection("topics").deleteOne({ topic_name });

      res.status(200).send({
        success: true,
        data,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };
}
