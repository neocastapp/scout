import { Router } from "express";
import Controller from "./topics.controller";

const topics: Router = Router();
const controller = new Controller();

topics.post("/", controller.CreateTopic);
topics.get("/", controller.GetAllTopics);
topics.get("/:contract", controller.GetTopic);
topics.put("/:contract", controller.UpdateTopic);
topics.delete("/:contract", controller.RemoveTopic);

export default topics;
