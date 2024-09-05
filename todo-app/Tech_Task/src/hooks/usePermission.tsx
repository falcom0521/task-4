import { Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

const usePermission = () => {
  const [hasPermission, setHasPermission] = useState(false); // Track permission status

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      setHasPermission(finalStatus === 'granted'); // Update state based on permission

      if (finalStatus !== 'granted') {
        Alert.alert('Permission not granted', 'Enable notification permissions in your settings.');
      }
    } catch (error) {
      console.log('Error getting notification permissions:', error);
    }
  };

  return {
    hasPermission, // Return permission status
    requestNotificationPermission,
  };
};

export default usePermission;
