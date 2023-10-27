import { Router } from "express";
import Controller from "./topics.controller";

const topics: Router = Router();
const controller = new Controller();

topics.post("/", controller.CreateTopic);
topics.get("/", controller.GetAllTopics);
topics.get("/:topic_name", controller.GetTopic);
topics.put("/:topic_name", controller.UpdateTopic);
topics.delete("/:topic_name", controller.RemoveTopic);

export default topics;
