import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale } from "react-native-size-matters";
import { Avatar } from "react-native-elements";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

export default function HeadComponent() {
  const [user, setUser] = useState(null);
  const [loaded] = useFonts({
    slime: require("../../assets/fonts/slime.ttf"),
  });
  const avatar = require("../../assets/ava.jpeg");



  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.SideBar}>
        <View style={styles.SecOut}>
          <Avatar
            size={moderateScale(35)}
            containerStyle={{
              borderWidth: moderateScale(1),
              borderColor: "#fff",
            }}
            rounded={moderateScale(100)}
            source={avatar}
          ></Avatar>
        </View>
      </View>

      <View style={styles.SideBar1}>
        <TouchableOpacity>
          <Feather name="search" size={moderateScale(20)} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={moderateScale(22)}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 10,
    height: moderateScale(50),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SideBar: {
    width: "60%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  SideBar1: {
    width: "23%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  SecOut: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  SecOut1: {
    width: "75%",
    height: "100%",
    alignItems: "center",
  },
  TextStyle: {
    color: "#b0aeb0",
    fontSize: moderateScale(16),
    fontFamily: "slime",
    fontWeight: "400",
  },
  TextStyle1: {
    color: "#fff",
    fontSize: moderateScale(11),
    fontFamily: "slime",
    fontWeight: "600",
    left: moderateScale(5),
  },
});
