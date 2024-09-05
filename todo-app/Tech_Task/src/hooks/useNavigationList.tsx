import { useNavigation, NavigationProp } from "@react-navigation/native";

// types.ts
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Profile: { userId: string };
  // Add other screens here
};

const useNavigationList = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const RegisterNav = () => {
    navigation.navigate("Login");
  };

  const BackNav = () => {
    navigation.goBack();
  };

  const SignUpNav = () => {
    navigation.navigate("Register");
  };

  const SuccessNav = (data: any) => {
    navigation.replace("Success");
  };

  const HomeNav = () => {
    navigation.replace("Home")
  }

  return {
    RegisterNav,
    BackNav,
    SignUpNav,
    SuccessNav,
    HomeNav
  };
};

export default useNavigationList;
