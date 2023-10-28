import { Router } from "express";

// Import Routers
import topics from "./topics/topics.route";
import notifications from "./notifications/notifications.route";
import users from "./users/users.route";

const router: Router = Router();

// Define routes
router.use("/topics", topics);
router.use("/notifications", notifications);
router.use("/users", users);

export default router;
