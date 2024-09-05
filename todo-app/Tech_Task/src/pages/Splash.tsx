import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import useStyles from "../hooks/useStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native-elements";
import useSplash from "../hooks/useSplash";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Splash() {
  const [storeData, setStoreData] = useState(null);
  const { SplashStyle } = useStyles();
  const { navigateToLogin } = useSplash();

  const LogoImage = require("../assets/Logo.png");

  const getAsyncStore = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("@user_data");
      const parsedData = jsonData != null ? JSON.parse(jsonData) : null;
      navigateToLogin(parsedData);
      return parsedData;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    getAsyncStore();
  }, []);

  return (
    <SafeAreaView style={SplashStyle.container}>
      <StatusBar hidden />

      <Image style={SplashStyle.LogoStyle} source={LogoImage} />

      <Text style={SplashStyle.TextStyle}>Maker Task</Text>
    </SafeAreaView>
  );
}
