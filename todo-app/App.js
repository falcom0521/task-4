// App.js
import React, { useEffect } from 'react';
import { Alert, View, Text, StyleSheet, StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Provider } from 'react-redux';
import store from './store';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission for notifications is required!');
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo Push Token:', token);
    };

    requestPermissions();

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      Alert.alert('Notification received!', JSON.stringify(notification));
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  return (
    <Provider store={store}>
      <MainNavigator />
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
