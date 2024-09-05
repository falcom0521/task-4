import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LoginHeader from "../../components/LoginHeader";
import { ScrollView } from "react-native-gesture-handler";
import SignInContents from "../../components/SignInContents";
import LoginBox from "../../components/LoginBox";
import LoadingComponent from "../../components/ModalComponents/LoadingComponent";

export default function LoginScreen() {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.ContainerScroll}>
        <LoginHeader />

        <SignInContents />

        <LoginBox visible={visible} setVisible={setVisible} />
        <LoadingComponent visible={visible} setVisible={setVisible} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  ContainerScroll: {
    flex: 1,
  },
});
