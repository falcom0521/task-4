import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RegisterHeader from "../../components/RegisterHeader";
import Registercontents from "../../components/Registercontents";
import RegisterBox from "../../components/RegisterBox";
import LoadingComponent from "../../components/ModalComponents/LoadingComponent";

export default function RegisterScreen() {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <RegisterHeader />

      <Registercontents />

      <RegisterBox setVisible={setVisible}  />

      <LoadingComponent visible={visible} setVisible={setVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
