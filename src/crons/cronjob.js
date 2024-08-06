import cron from "node-cron";
import userService from "../services/userService.js";
import sendEmail from "../services/emailService.js";

const checkTasks = async () => {
  try {
    const users = await userService.getAllUsers();
    console.log("Cron job started", users);

    const now = new Date();

    users.forEach(async (user) => {
      const taskDate = new Date(user.task.date);
      const timeDiff = taskDate - now;

      // Notify when assigned to a task
      if (user.task.assigned && !user.task.notifiedAssigned) {
        await sendEmail(
          user.email,
          user.username,
          "You have been assigned a new task."
        );
        user.task.notifiedAssigned = true;
      }

      // Notify 1 day before due date
      if (timeDiff <= 24 * 60 * 60 * 1000 && !user.task.notified1Day) {
        await sendEmail(
          user.email,
          user.username,
          "Your task is due in 1 day."
        );
        user.task.notified1Day = true;
      }

      // Notify 12 hours before due date
      if (timeDiff <= 12 * 60 * 60 * 1000 && !user.task.notified12Hours) {
        await sendEmail(
          user.email,
          user.username,
          "Your task is due in 12 hours."
        );
        user.task.notified12Hours = true;
      }

      // Notify 1 hour before due date
      if (timeDiff <= 1 * 60 * 60 * 1000 && !user.task.notified1Hour) {
        await sendEmail(
          user.email,
          user.username,
          "Your task is due in 1 hour."
        );
        user.task.notified1Hour = true;
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Cronjob ended");
  }
};

const startCronJob = () => {
  cron.schedule(" *60 * * * *", checkTasks, { // Run every hour
  
    timezone: "Africa/Lagos",
  });
  console.log("Cronjob is active");
};

export default startCronJob;
