import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { registerState } from "../../redux/actions";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SuccessContents from "../../components/SuccessContents";
import ConfettiCannon from "react-native-confetti-cannon";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moderateScale } from "react-native-size-matters";
import useNavigationList from "../../hooks/useNavigationList";

export default function AuthSucess() {
  const auth = useSelector(registerState);
  const { HomeNav } = useNavigationList();

  let cannon;

  const shootConfetti = () => {
    if (cannon) {
      cannon.start();
    }
  };

  useEffect(() => {
    shootConfetti();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />

      <SuccessContents />

      <ConfettiCannon
        count={200} // Number of confetti to shoot
        origin={{ x: -10, y: 0 }} // Confetti origin position
        autoStart={false} // Do not start automatically
        ref={(ref) => (cannon = ref)} // Reference to the ConfettiCannon component
      />

      <TouchableOpacity onPress={HomeNav} style={styles.SignButton}>
        <Text style={styles.SignText}>Proceed to Dashboard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  SignButton: {
    width: moderateScale(320),
    height: moderateScale(50),
    backgroundColor: "#fff",
    top: moderateScale(480),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  SignText: {
    color: "#000",
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
});
