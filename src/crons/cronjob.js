import cron from "node-cron";
import sendEmail from "../services/emailService.js";
import userService from "../services/userService.js";

const checkTasks = async () => {
  console.log("Check your Tasks.");
  const today = new Date();
  const day = today.getDay();
  const month = today.getMonth() + 1;

  try {
    const users = await userService.getAllUsers();
    console.log("Cron job started", users);
    users.forEach(async (user) => {
      // Cron job started
      const taskDay = user.task.date.getDay();
      const taskMonth = user.task.date.getMonth() + 1;

      if (taskDay === day && taskMonth === month) {
        await sendEmail(user.email, user.username);
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Cronjob ended");
  }
};

const startCronJob = () => {
  cron.schedule(" * * * * *", checkTasks, { // Run every minute
    timezone: "Africa/Lagos",
  });
  console.log("Cronjob is active");
};

export default startCronJob;
