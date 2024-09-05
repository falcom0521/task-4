import { Dimensions, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import useNavigationList from "../hooks/useNavigationList";

const { width, height } = Dimensions.get("window");

export default function RegisterHeader() {
  const { BackNav } = useNavigationList();
  return (
    <View style={styles.HeadContainer}>
      <TouchableOpacity onPress={BackNav}>
        <AntDesign
          style={styles.BackStyle}
          name="arrowleft"
          size={moderateScale(30)}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  HeadContainer: {
    width: width,
    height: moderateScale(50),
    justifyContent: "center",
  },

  BackStyle: {
    marginLeft: moderateScale(20),
  },
});
