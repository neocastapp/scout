import { Request, Response } from "express";
import { db } from "../../utilities/mongo";

export default class ContractsController {
  public CreateTopic = async (req: Request, res: Response) => {
    try {
      const topic_data = req.body;

      try {
        const data = await db.collection("topics").insertOne({
          topic_data,
        });

        res.status(200).send({
          success: true,
          data: data,
        });
      } catch (e) {
        if (e.code === 11000) {
          // duplicate key error
          res.status(200).send({
            success: false,
            reason: "Topic already exists",
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

  public GetAllTopics = async (req: Request, res: Response) => {
    try {
      const data = await db.collection("topics").find({}).toArray();
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

  public GetTopic = async (req: Request, res: Response) => {
    try {
      const topicId = req.params.topicId;
      const topic = await db.collection("topics").findOne({ topicId });

      if (topic) {
        res.status(200).send({
          success: true,
          data: topic,
        });
      } else {
        res.status(404).send({
          success: false,
          reason: "Topic not found",
        });
      }
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };

  public UpdateTopic = async (req: Request, res: Response) => {
    try {
      const topicId = req.params.topicId;
      const topic_data = req.body;

      const data = await db
        .collection("topics")
        .updateOne({ topicId }, { $set: { topic_data } });

      const topic = await db.collection("topics").findOne({ topicId });

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

  public RemoveTopic = async (req: Request, res: Response) => {
    try {
      const topicId = req.params.topicId;

      const data = await db.collection("topics").deleteOne({ topicId });

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
