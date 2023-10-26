import { Router } from "express";

// Import Routers
import topics from "./topics/topics.route";
import notifications from "./notifications/notifications.route";

const router: Router = Router();

// Define routes
router.use("/topics", topics);
router.use("/notifications", notifications);

export default router;
