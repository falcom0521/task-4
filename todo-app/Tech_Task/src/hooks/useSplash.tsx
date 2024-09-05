import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  // Add other routes here
};

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;

const useSplash = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const navigateToLogin = (entry: any) => {
    setTimeout(() => {
      if (entry && Object.keys(entry).length > 0) {
        navigation.replace("Home");
      } else {
        navigation.replace("Auth");
      }
    }, 1500);
  };

  return {
    navigateToLogin,
  };
};

export default useSplash;
