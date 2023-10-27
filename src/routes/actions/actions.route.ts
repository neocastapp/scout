import { Router } from "express";
import Controller from "./actions.controller";

const topics: Router = Router();
const controller = new Controller();

topics.post("/new", controller.CreateAction);
topics.get("/", controller.GetAllActions);
topics.get("/:action_name", controller.GetAction);
topics.put("/:action_name", controller.UpdateAction);
topics.delete("/:action_name", controller.RemoveAction);

export default topics;
