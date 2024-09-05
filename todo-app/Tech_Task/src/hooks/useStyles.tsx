import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const useStyles = () => {
  //Splash Screen Styles//
  const SplashStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
      alignItems: "center",
      justifyContent: "center",
    },
    LogoStyle: {
      width: moderateScale(130),
      height: moderateScale(130),
    },
    TextStyle: {
      fontSize: moderateScale(20),
      fontWeight: "bold",
      color: "#fff",
      marginTop: moderateScale(30),
    },
  });
  //Splash Screen Styles//

  

  return {
    SplashStyle,
  };
};

export default useStyles;
