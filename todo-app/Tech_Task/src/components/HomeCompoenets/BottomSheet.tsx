import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import { View } from "react-native-animatable";
import { moderateScale } from "react-native-size-matters";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { UseDispatch, useDispatch } from "react-redux";
import { AddingTasks } from "../../redux/actions";

export default function BottomSheetComponent({
  sheetRef,
  setShow,
  setMode,
  mode,
  formDate,
  formTime,
  setFormattedDate,
  setFormattedTime,
}) {
  const [sub, setSub] = useState("");
  const [tittle, setTittle] = useState("");
  const dispatch = useDispatch();
  let bottomSheetRef: BottomSheetMethods | null = null;

  const handleSubmit = () => {
    if (sub === "") {
      Alert.alert(
        "Add Subtitle",
        "Subtitle cannot be empty.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    } else if (tittle === "") {
      Alert.alert(
        "Add Title",
        "Title cannot be empty.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    } else if (formDate === "" && formTime === "") {
      Alert.alert(
        "Select Date and Time",
        "Date and Time cannot be empty.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    } else if (
      sub !== "" &&
      tittle !== "" &&
      formDate !== "" &&
      formTime !== ""
    ) {
      const newTask = {
        id: Math.random().toString(),
        name: sub,
        message: tittle,
        date: formDate,
        time: formTime,
      };

      if (newTask) {
        console.log(newTask);
        setSub("");
        setTittle("");
        dispatch(AddingTasks(newTask));
        sheetRef.current?.close();
      }
    }
  };

  const Open = () => {
    setShow(true);
  };

  return (
    <BottomSheet
      containerHeight={moderateScale(1000)}
      modal
      style={styles.container}
      ref={sheetRef}
    >
      <View style={styles.container}>
        <View style={styles.InputCont}>
          <TextInput
            onChangeText={setSub}
            value={sub}
            style={{
              width: "100%",
              height: "100%",
              paddingLeft: moderateScale(17),
              color: "#cecbcb",
            }}
            placeholderTextColor={"#a6a4a4"}
            placeholder="Input new sub task"
          />
        </View>

        <View style={styles.InputCont1}>
          <TextInput
            onChangeText={setTittle}
            value={tittle}
            style={{
              width: "100%",
              height: "100%",
              paddingLeft: moderateScale(17),
              color: "#cecbcb",
            }}
            placeholderTextColor={"#a6a4a4"}
            placeholder="Input new tittle task"
          />
        </View>

        <View style={styles.InputCont2}>
          <TouchableOpacity onPress={() => Open()} style={styles.ButtonStyling}>
            <MaterialIcons
              name="date-range"
              size={moderateScale(22)}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonStyling1}>
            <Ionicons
              name="notifications-sharp"
              size={moderateScale(21)}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.ButtonStyling2}
          >
            <FontAwesome
              name="arrow-up"
              size={moderateScale(20)}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181818",
    paddingTop: moderateScale(5),
  },
  InputCont: {
    width: "90%",
    height: moderateScale(50),
    backgroundColor: "#2e2d2d",
    alignSelf: "center",
    borderRadius: moderateScale(8),
  },
  InputCont1: {
    width: "90%",
    height: moderateScale(50),
    backgroundColor: "#2e2d2d",
    alignSelf: "center",
    borderRadius: moderateScale(8),
    marginTop: moderateScale(30),
  },
  InputCont2: {
    width: "90%",
    height: moderateScale(60),
    alignSelf: "center",
    borderRadius: moderateScale(8),
    marginTop: moderateScale(50),
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  ButtonStyling: {
    width: moderateScale(60),
    height: moderateScale(60),
    backgroundColor: "#393a49",
    elevation: moderateScale(5),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonStyling1: {
    width: moderateScale(60),
    height: moderateScale(60),
    backgroundColor: "#646587",
    elevation: moderateScale(5),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonStyling2: {
    width: moderateScale(60),
    height: moderateScale(60),
    backgroundColor: "#2c2e6f",
    elevation: moderateScale(5),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
});
