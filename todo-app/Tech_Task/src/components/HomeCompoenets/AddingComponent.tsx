import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");

export default function AddingComponent({  sheetRef }) {
  const [user, setUser] = useState(null);

  const OpenSheet = () => {
    sheetRef.current?.open()
  };

  useEffect(() => {
    const getAsyncStore = async () => {
      try {
        const jsonData = await AsyncStorage.getItem("@user_data");
        const parsedData = jsonData != null ? JSON.parse(jsonData) : null;
        setUser(parsedData);
      } catch (error) {
      }
    };

    getAsyncStore();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.FirstCont}>
        <Text style={styles.TextFirst}>Hi ,</Text>

        <Text style={styles.TextFirst1}>{user?.user}</Text>
      </View>

      <View style={styles.FirstCont1}>
        <Animatable.View
          animation="bounceIn"
          iterationCount="infinite"
          direction="alternate"
          easing="ease-in-out"
        >
          <TouchableOpacity onPress={() => OpenSheet()} style={styles.button}>
            <Ionicons
              name="add-outline"
              size={moderateScale(20)}
              color="#fff"
            />
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: moderateScale(60),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  FirstCont: {
    width: "70%",
    height: "100%",
    flexDirection: "row",
    paddingLeft: moderateScale(25),
    paddingTop: moderateScale(15),
  },
  FirstCont1: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: moderateScale(10),
  },
  TextFirst: {
    color: "#fff",
    fontSize: moderateScale(20),
    fontWeight: "400",
    fontFamily: "slime",
  },
  TextFirst1: {
    color: "#fff",
    fontSize: moderateScale(20),
    fontWeight: "bold",
    fontFamily: "slime",
    marginLeft: moderateScale(10),
  },
  button: {
    backgroundColor: "#273d43",
    width: 60,
    height: 60,
    borderRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
