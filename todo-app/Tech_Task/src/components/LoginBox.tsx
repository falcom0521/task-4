import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { moderateScale } from "react-native-size-matters";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginState } from "../redux/actions";
import useNavigationList from "../hooks/useNavigationList";

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const { width, height } = Dimensions.get("window");

export default function LoginBox({ setVisible }) {
  const dispatch = useDispatch();
  const auth = useSelector(loginState);
  const { SignUpNav, SuccessNav } = useNavigationList();
  const data = auth?.payload?.auth?.user;

  useEffect(() => {
    // console.log(auth?.payload?.auth?.user);
    // setVisible(true);
    // if (data && Object.keys(data).length > 0) {
    //   setTimeout(() => {
    //     setVisible(false);
    //     SuccessNav();
    //   }, 500);
    // }
  }, []);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle form submission
          console.log(values);

          const { email, password } = values;

          dispatch(loginState({ email, password }));
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.Container}>
            <View style={styles.BoxHeadCo}>
              <Text style={styles.HeadColor}>Email</Text>
            </View>

            <View style={styles.InputStyle}>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
                placeholder="Enter your email"
                placeholderTextColor={"#bfc2c2"}
                style={styles.TextInputCont}
              />

              <View style={styles.TextSide}>
                <MaterialIcons
                  name="email"
                  size={moderateScale(20)}
                  color="#979999"
                />
              </View>
            </View>

            <View style={styles.BoxHeadCo}>
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.BoxHeadCo}>
              <Text style={styles.HeadColor}>Password</Text>
            </View>

            <View style={styles.InputStyle}>
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                keyboardType="visible-password"
                placeholder="Enter your password"
                placeholderTextColor={"#bfc2c2"}
                style={styles.TextInputCont}
              />

              <View style={styles.TextSide}>
                <MaterialIcons
                  name="lock"
                  size={moderateScale(20)}
                  color="#979999"
                />
              </View>
            </View>

            <View style={styles.BoxHeadCo}>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
              }}
            >
              <Text style={styles.ForgotPass}>Forgot Password ?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.SignButton}
            >
              <Text style={styles.SignText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.SignUpedStyle}>
              <Text style={styles.DontStyle}>Dont have an account ?</Text>

              <TouchableOpacity onPress={SignUpNav}>
                <Text style={styles.DontStyle1}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    marginTop: moderateScale(20),
    alignItems: "center",
    alignSelf: "center",
  },
  Container: {
    alignItems: "center",
    paddingTop: moderateScale(40),
  },
  BoxHeadCo: {
    width: moderateScale(330),
    height: moderateScale(20),
    marginTop: moderateScale(5),
    justifyContent: "center",
  },
  HeadColor: {
    color: "#fff",
    fontSize: moderateScale(12),
    fontWeight: "400",
  },
  InputStyle: {
    width: moderateScale(330),
    height: moderateScale(50),
    marginTop: moderateScale(5),
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(0.5),
    borderColor: "#bfc2c2",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#4b4d4d",
  },
  TextInputCont: {
    width: "85%",
    height: "100%",
    paddingLeft: moderateScale(10),
    color: "#fff",
  },
  TextSide: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ForgotPass: {
    fontSize: moderateScale(13),
    fontWeight: "400",
    color: "#fff",
    alignSelf: "flex-end",
    top: moderateScale(10),
  },
  SignButton: {
    width: moderateScale(320),
    height: moderateScale(50),
    backgroundColor: "#fff",
    marginTop: moderateScale(120),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  SignText: {
    color: "#000",
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
  SignUpedStyle: {
    width: moderateScale(195),
    height: moderateScale(40),
    marginTop: moderateScale(20),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  DontStyle: {
    color: "#fff",
    fontSize: moderateScale(13),
    fontWeight: "300",
  },
  DontStyle1: {
    color: "#fff",
    fontSize: moderateScale(13),
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: moderateScale(11),
    fontWeight: "400",
  },
});
