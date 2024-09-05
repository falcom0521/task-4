import { Dimensions, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CompleateTask } from "../../redux/actions";
import { moderateScale } from "react-native-size-matters";
import CompletedTaskList from "../../components/CompleteComponent/CompletedTaskList";
import CalendarComponent from "../../components/CompleteComponent/CalendarComponent";

const { height, width } = Dimensions.get("window");

export default function Compleated() {
  const compleatetasks = useSelector(CompleateTask);
  const compleateList = compleatetasks?.payload?.task?.completedTasks;
  const [dateSorting , setDateSorting] = useState(null)


  return (
    <View style={styles.container}>
      <CalendarComponent setSorting={setDateSorting} />
      <View style={{ marginTop: moderateScale(180), flex: 1 }}>
        <CompletedTaskList sortingDate={dateSorting}  compleateList={compleateList} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
