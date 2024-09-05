import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
const { width, height } = Dimensions.get("window");

export default function HeadComplete() {
  return (
    <View style={styles.container}>
      <Text style={styles.TextStyle}>Completed Tasks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: moderateScale(50),
    paddingLeft:moderateScale(10) ,
    paddingTop:moderateScale(5)
  },
  TextStyle: {
    fontSize: moderateScale(23),
    fontWeight: "bold",
    fontFamily: "regular",
    color: "#fff",
  },
});
