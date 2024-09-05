import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { Swipeable } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { format, parseISO, isValid, parse } from "date-fns";
import {
  RemoveCompletedTask,
  ToggleTaskCompletion,
  removeUncompletedTask,
} from "../../redux/actions";
import { Image } from "react-native-elements";

const { width } = Dimensions.get("window");

const UnCompletedTaskList = ({ compleateList, sortingDate }) => {
  const dispatch = useDispatch();
  const [selectedChats, setSelectedChats] = useState([]);
  const [idPass, setIdPass] = useState(null);
  const TaskImage = require("../../assets/puzzle.png");

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
              dispatch(removeUncompletedTask(idPass));
            },
          },
        ],
        { cancelable: false }
      );9
    }
  };

  const toggleCheckbox = (id) => {
    if (selectedChats.includes(id)) {
      setSelectedChats(selectedChats.filter((chatId) => chatId !== id));
    } else {
      setSelectedChats([...selectedChats, id]);
    }
  };

  const renderRightActions = () => (
    <View style={styles.rightActions}>
      <TouchableOpacity onPress={DeleteData} style={styles.OptionBoxStyle}>
        <MaterialIcons name="delete" size={moderateScale(24)} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const CompleatedItem = memo(({ name, message, checked, id, time }) => {
    

    return (
      <Swipeable
        containerStyle={{ marginTop: moderateScale(20) }}
        renderRightActions={renderRightActions}
        onSwipeableOpen={() => setIdPass(id)}
      >
        <View style={styles.chatItem}>
          <View style={styles.CateCont}>
            <View style={styles.CheckPart}>
              <AntDesign
                name="closecircle"
                size={moderateScale(20)}
                color="red"
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
  });

  useEffect(() => {
    console.log("Sorting date changed to:", sortingDate);
  }, [sortingDate]);

  const parseDate = (dateString) => {
    const parsedDate = parseISO(dateString);
    if (isValid(parsedDate)) return parsedDate;

    const fallbackDate = parse(dateString, "yyyy-MM-dd", new Date());
    return isValid(fallbackDate) ? fallbackDate : new Date(NaN);
  };

  const filteredTasks = compleateList.filter((task) => {
    const taskDate = parseDate(task.date);
    return format(taskDate, "yyyy-MM-dd") === sortingDate;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateA - dateB;
  });

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Image style={styles.EmptyImageStyle} source={TaskImage} />
      <Text style={styles.EmptysubText}>No listed pending tasks</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={renderEmptyComponent}
        data={sortedTasks}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <CompleatedItem
            name={item.name}
            message={item.message}
            checked={selectedChats.includes(item.id)}
            id={item.id}
            time={item.time}
            date={item.date}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: moderateScale(80),
    height: "100%",
    backgroundColor: "red",
  },
  OptionBoxStyle: {
    width: moderateScale(50),
    height: "50%",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  EmptysubText: {
    color: "#fff",
    fontSize: moderateScale(15),
    fontWeight: "600",
    marginTop: moderateScale(20),
    fontFamily: "slime",
  },
  EmptyImageStyle: {
    width: moderateScale(120),
    height: moderateScale(120),
    marginTop: moderateScale(50),
  },
});

export default UnCompletedTaskList;
