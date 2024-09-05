import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CheckBox, Image } from "react-native-elements";
import { FlatList } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, isToday, isBefore, isAfter } from "date-fns";
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  CompleateTask,
  ListingTask,
  RemoveTasks,
  ToggleTaskCompletion,
  markUncompleted,
} from "../../redux/actions";
import usePermission from "../../hooks/usePermission";
import useNotification from "../../hooks/useNotification";
import BottomSheet from "../../components/HomeCompoenets/BottomSheet";
import BottomSheetEdit from "../../components/HomeCompoenets/BottomSheetEdit";
import HeadComponent from "../../components/HomeCompoenets/HeadCompoenet";
import AddingComponent from "../../components/HomeCompoenets/AddingComponent";
import { useSharedValue } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Home() {
  const EmptyTaskImage = require("../../assets/Empty.png");
  const [selectedChats, setSelectedChats] = useState([]);
  const [upsheet, setUpSheet] = useState(false);
  const sheetRef = useRef(null);
  const sheetRef1 = useRef(null);
  const tasks = useSelector(ListingTask);
  const compleatetasks = useSelector(CompleateTask);
  const [idPass, setIdPass] = useState(null);
  const [timeShow, setTimeShow] = useState(false);
  const { requestNotificationPermission } = usePermission();
  const { scheduleNotification } = useNotification();
  const dispatch = useDispatch();
  const listedTasks = tasks?.payload?.task?.tasks;
  const compleateList = compleatetasks?.payload?.task?.completedTasks;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [formattedTime, setFormattedTime] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const translationX = useSharedValue(0);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const toggleCheckbox = (id) => {
    if (selectedChats.includes(id)) {
      setSelectedChats(selectedChats.filter((chatId) => chatId !== id));
    } else {
      setSelectedChats([...selectedChats, id]);
    }
  };

  const handleDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const formattedDate = format(currentDate, "yyyy-MM-dd");
    setShow(false);
    setTimeShow(true);
    setFormattedDate(formattedDate);
  };

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    const formattedTime = format(currentTime, "HH:mm:ss");
    setTimeShow(false);
    setFormattedTime(formattedTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  

  const openTask = () => {
    sheetRef1.current?.open();
  };

  const DeleteData = () => {
    if (idPass !== null) {
      Alert.alert(
        "Delete Task",
        "Are you sure you want to delete this task?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              dispatch(RemoveTasks(idPass));
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const renderRightActions = () => (
    <View style={styles.rightActions}>
      <TouchableOpacity onPress={DeleteData} style={styles.OptionBoxStyle}>
        <MaterialIcons name="delete" size={moderateScale(24)} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={openTask} style={styles.OptionBoxStyle1}>
        <MaterialIcons
          name="edit-square"
          size={moderateScale(21)}
          color="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.OptionBoxStyle2}>
        <MaterialIcons name="notifications" size={moderateScale(24)} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const TaskItem = ({ name, message, checked, onPress, id, time }) => {
    setIdPass(id);
    if (checked === true) {
      dispatch(ToggleTaskCompletion(id));
    }

    useEffect(() => {
      const taskChecker = setInterval(() => {
        const now = new Date();
        listedTasks.forEach((task) => {
          const taskTime = new Date(`${task.date}T${task.time}`);
          if (isBefore(taskTime, now)) {
            dispatch(markUncompleted(task.id));
            dispatch(RemoveTasks(task.id));
            scheduleNotification(task);
          } else {
            scheduleNotification(task);
          }
        });
      }, 60000);

      return () => clearInterval(taskChecker);
    }, [listedTasks, dispatch]);

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.chatItem}>
          <View style={styles.CateCont}>
            <View style={styles.CheckPart}>
              <CheckBox
                checked={checked}
                onPress={onPress}
                containerStyle={styles.checkbox}
              />
            </View>
            <View style={styles.chatDetails}>
              <Text style={styles.chatHeader}>{name}</Text>
              <Text style={styles.TimeStyle}>{time}</Text>
              <Text style={styles.chatMessage}>{message}</Text>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };


  const todayTasks = listedTasks.filter((task) =>
    isToday(new Date(`${task.date}T${task.time}`))
  );
  const upcomingTasks = listedTasks.filter(
    (task) =>
      !isToday(new Date(`${task.date}T${task.time}`)) &&
      isAfter(new Date(`${task.date}T${task.time}`), new Date())
  );



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <HeadComponent />
        <AddingComponent sheetRef={sheetRef} />

        <View style={styles.flatListContainer}>
          {todayTasks.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Tasks Due Today</Text>
              <FlatList
                data={todayTasks}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={({ item }) => (
                  <TaskItem
                    name={item.name}
                    message={item.message}
                    checked={selectedChats.includes(item.id)}
                    id={item.id}
                    time={item.time}
                    onPress={() => toggleCheckbox(item.id)}
                  />
                )}
              />
            </View>
          )}

          {upcomingTasks.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
              <FlatList
                data={upcomingTasks}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={({ item }) => (
                  <TaskItem
                    name={item.name}
                    message={item.message}
                    checked={selectedChats.includes(item.id)}
                    id={item.id}
                    time={item.time}
                    onPress={() => toggleCheckbox(item.id)}
                  />
                )}
              />
            </View>
          )}

          {todayTasks.length === 0 && upcomingTasks.length === 0 && (
            <View style={styles.emptyContainer}>
              <Image style={styles.EmptyImageStyle} source={EmptyTaskImage} />
              <Text style={styles.EmptysubText}>No tasks found</Text>
            </View>
          )}
        </View>

        <BottomSheetEdit
          setFormattedDate={setFormattedDate}
          setFormattedTime={setFormattedTime}
          formDate={formattedDate}
          formTime={formattedTime}
          mode={mode}
          id={idPass}
          setMode={setMode}
          setShow={setShow}
          sheetRef={sheetRef1}
        />

        <BottomSheet
          setFormattedDate={setFormattedDate}
          setFormattedTime={setFormattedTime}
          formDate={formattedDate}
          formTime={formattedTime}
          mode={mode}
          setMode={setMode}
          setShow={setShow}
          sheetRef={sheetRef}
        />

        {timeShow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"time"}
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        )}

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={handleDate}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030203",
  },
  flatListContainer: {
    flex: 1,
    width: "100%",
    marginTop: moderateScale(20),
  },
  sectionContainer: {
    marginBottom: moderateScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: "#fff",
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  chatItem: {
    flexDirection: "row",
    width: width - 30,
    height: moderateScale(80),
    paddingHorizontal: moderateScale(10),
    alignItems: "center",
    backgroundColor: "#42425c",
    alignSelf: "center",
  },
  chatDetails: {
    flex: 1,
    marginLeft: 10,
  },
  chatHeader: {
    fontWeight: "bold",
    fontSize: moderateScale(16),
    color: "#fff",
  },
  TimeStyle: {
    fontWeight: "bold",
    fontSize: moderateScale(9),
    color: "grey",
  },
  chatMessage: {
    color: "gray",
    fontSize: moderateScale(12),
  },
  CateCont: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
  },
  CheckPart: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  EmptyImageStyle: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(0),
  },
  EmptysubText: {
    color: "#fff",
    fontSize: moderateScale(14),
    fontWeight: "400",
    marginTop: moderateScale(20),
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: moderateScale(150),
    height: "100%",
  },
  OptionBoxStyle: {
    width: moderateScale(50),
    height: "100%",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  OptionBoxStyle1: {
    width: moderateScale(50),
    height: "100%",
    backgroundColor: "#3a3a42",
    alignItems: "center",
    justifyContent: "center",
  },
  OptionBoxStyle2: {
    width: moderateScale(50),
    height: "100%",
    backgroundColor: "#232334",
    alignItems: "center",
    justifyContent: "center",
  },
});
