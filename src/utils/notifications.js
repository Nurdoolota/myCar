import * as Notifications from 'expo-notifications';

export async function scheduleNotification(title, body, date) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { date } // JS Date object
  });
}