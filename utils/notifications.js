import { Notifications, Permissions } from "expo";
import { AsyncStorage } from "react-native";

const NOTIFICATION_KEY = "mobileFlashcards:notifications";

function createNotification() {
  return {
    title: "Review your flashcards!",
    body: "👋 don't forget to study today",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    }
  };
}

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function getNotificationTime() {
  let tomorrow = new Date(Date.now());

  // tomorrow.setDate(tomorrow.getDate() + 1) //uncomment for actual build
  // tomorrow.setHours(17);

  // tomorrow.setSeconds(tomorrow.getSeconds() + 10); // comment out for actual build
  tomorrow.setMinutes(tomorrow.getMinutes() + 1);

  console.log(tomorrow.toString());
  return tomorrow;
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data) => {
      console.log("JSON Result:", JSON.parse(data));
      return JSON.parse(data);
    })
    .then((data) => {
      console.log("data:", data === null)
      if (data === null) {
        console.log("if route")
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            console.log(status);
            if (status === "granted") {
              const notificationTime = getNotificationTime();
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: notificationTime,
                });
            }
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            (AsyncStorage.getItem(NOTIFICATION_KEY)).then(res => console.log(res));
          })
      }
    })
}
