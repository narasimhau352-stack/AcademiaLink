import prisma from "../config/database.js";

// Get notifications for logged-in user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

// Mark one notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = Number(req.params.id);

    if (!notificationId) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification ID",
      });
    }

    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId: req.user.id,
      },
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    const updatedNotification =
      await prisma.notification.update({
        where: {
          id: notificationId,
        },
        data: {
          isRead: true,
        },
      });

    res.json({
      success: true,
      notification: updatedNotification,
    });
  } catch (error) {
    console.error(
      "Mark notification as read error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: {
        userId: req.user.id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error(
      "Mark all notifications error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update notifications",
    });
  }
};