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
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(17);
  // tomorrow.setMinutes(tomorrow.getMinutes() + 1); // just for development
  return tomorrow;
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data) => {
      return JSON.parse(data);
    })
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === "granted") {
              const notificationTime = getNotificationTime();
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: notificationTime,
                  repeat: "day",
                });
            }
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          })
      }
    })
}
