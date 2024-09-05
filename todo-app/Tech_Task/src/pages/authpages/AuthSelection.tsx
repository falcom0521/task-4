import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { Button } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native-elements";
import useNavigationList from "../../hooks/useNavigationList";

export default function AuthSelection() {
  const bg = require("../../assets/bg.jpg");
  const TaskImage = require("../../assets/TaskLogo.png");
  const { RegisterNav, SignUpNav } = useNavigationList();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ImageCo}>
        <Image style={styles.ImageSt} source={TaskImage} />
      </View>

      <StatusBar hidden />

      <View style={styles.BoxContainer}>
        <View style={styles.BoxView}>
          <Text style={styles.TextStyle}>Welcome</Text>
        </View>

        <View style={styles.DesContainer}>
          <Text style={styles.TextColor}>
            Welcome to the ultimate task management app, designed to help you
            organize, track, and accomplish your daily tasks with ease.{" "}
          </Text>
        </View>

        <View style={styles.ImageOutBox}>
          <TouchableOpacity onPress={SignUpNav} style={styles.ButtonSec}>
            <Text style={styles.ButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={RegisterNav} style={styles.ButtonSec1}>
            <Text style={styles.ButtonText1}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  BoxContainer: {
    width: "85%",
    height: "45%",
    alignItems: "center",
  },
  BoxView: {
    width: "100%",
    height: moderateScale(40),
    marginTop: moderateScale(5),
  },
  TextStyle: {
    color: "#fff",
    fontSize: moderateScale(20),
    fontWeight: "bold",
  },
  DesContainer: {
    width: "100%",
    height: moderateScale(50),
  },
  TextColor: {
    color: "#fff",
    fontSize: moderateScale(13),
    fontWeight: "300",
  },
  ImageOutBox: {
    width: "100%",
    height: moderateScale(140),
    marginTop: moderateScale(20),
    alignItems: "center",
    justifyContent: "space-around",
  },
  ButtonSec: {
    width: moderateScale(310),
    height: moderateScale(45),
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonText: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "#000",
    elevation: moderateScale(5),
    shadowOpacity: moderateScale(5),
  },
  ButtonSec1: {
    width: moderateScale(310),
    height: moderateScale(45),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: moderateScale(1),
  },
  ButtonText1: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "#fff",
    elevation: moderateScale(5),
    shadowOpacity: moderateScale(5),
  },
  ImageCo: {
    width: moderateScale(200),
    height: moderateScale(200),
    top: moderateScale(-120),
    alignItems: "center",
    justifyContent: "center",
  },
  ImageSt: {
    width: moderateScale(180),
    height: moderateScale(180),
  },
});
