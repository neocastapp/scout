import { Router } from "express";
import Controller from "./topics.controller";

const topics: Router = Router();
const controller = new Controller();

topics.post("/new", controller.CreateTopic);
topics.get("/", controller.GetAllTopics);
topics.get("/:topic_name", controller.GetTopic);
topics.put("/:topic_name", controller.UpdateTopic);
topics.delete("/:topic_name", controller.RemoveTopic);
topics.put("/:topic_name/subscribe", controller.SubscribeToTopic);
topics.put("/:topic_name/unsubscribe", controller.UnsubscribeToTopic);

export default topics;
