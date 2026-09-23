import { Router } from "express";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "./notificationController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

// Get logged-in user's notifications
router.get(
  "/",
  authenticate,
  getNotifications
);

// Mark one notification as read
router.patch(
  "/:id/read",
  authenticate,
  markNotificationAsRead
);

// Mark all notifications as read
router.patch(
  "/read-all",
  authenticate,
  markAllNotificationsAsRead
);

export default router;