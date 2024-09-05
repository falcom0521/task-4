import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import { Text } from "react-native-elements";

const { width, height } = Dimensions.get("window");

export default function Registercontents() {
  return (
    <View style={styles.container}>
      <Text style={styles.HeadingText}>Sign Up</Text>

      <Text style={styles.HeadingTextSub}>
        Sign up with one of the following options
      </Text>
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
    marginTop: moderateScale(4),
  },
});
