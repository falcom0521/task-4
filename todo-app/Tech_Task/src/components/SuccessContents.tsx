import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { moderateScale } from "react-native-size-matters";
import { Text } from "react-native-elements";
import { useSelector } from "react-redux";
import { registerState } from "../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function SuccessContents() {
  const auth = useSelector(registerState);
  const userName = auth?.payload?.auth?.user?.user;

  const AsyncStore = async (data: any) => {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("@user_data", jsonData);
      console.log("Data stored successfully");
    } catch (error) {
      console.log("Error storing data: ", error);
    }
  };

  useEffect(() => {
    console.log(auth?.payload?.auth?.user);

    if (auth?.payload?.auth?.user) {
      AsyncStore(auth?.payload?.auth?.user);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.HeadingText}>{userName}</Text>

      <Text style={styles.HeadingTextSub}>
        Nice to meet you. Welcome to app
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: moderateScale(60),
    marginTop: moderateScale(20),
  },
  HeadingText: {
    color: "#fff",
    fontSize: moderateScale(20),
    fontWeight: "bold",
    marginLeft: moderateScale(20),
  },
  HeadingTextSub: {
    color: "#fff",
    fontSize: moderateScale(14),
    fontWeight: "200",
    marginLeft: moderateScale(20),
    marginTop: moderateScale(4),
  },
});
