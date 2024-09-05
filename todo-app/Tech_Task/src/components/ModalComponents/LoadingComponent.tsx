import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { BallIndicator, UIActivityIndicator } from "react-native-indicators";
import { moderateScale } from "react-native-size-matters";

interface LoadingComponentProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ visible }) => {
  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <UIActivityIndicator size={moderateScale(60)} color="#fff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default LoadingComponent;
