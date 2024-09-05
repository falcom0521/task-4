import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import { Text } from "react-native-elements";

const { width, height } = Dimensions.get("window");

export default function SignInContents() {
  return (
    <View style={styles.container}>
      <Text style={styles.HeadingText}>Welcome Back</Text>

      <Text style={styles.HeadingTextSub}>Lets get you back to business</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: moderateScale(60),
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
    fontWeight: "300",
    marginLeft: moderateScale(20),
    marginTop: moderateScale(2),
  },
});
