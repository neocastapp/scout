import { Router } from "express";
import Controller from "./actions.controller";

const actions: Router = Router();
const controller = new Controller();

actions.post("/trigger", controller.doAutomation);

export default actions;
