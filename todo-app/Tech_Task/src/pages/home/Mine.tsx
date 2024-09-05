import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import CalendarComponent from '../../components/UnCompletedComponent/CalendarComponent';
import { moderateScale } from 'react-native-size-matters';
import { listUncompletedTasks, markUncompleted } from '../../redux/actions';
import UnCompletedTaskList from '../../components/UnCompletedComponent/UnCompletedTaskList';

export default function Mine() {
  const compleatetasks = useSelector(markUncompleted);
  const unComple = compleatetasks?.payload?.task?.uncompletedTasks;
  const [dateSorting , setDateSorting] = useState(null)




  return (
    <View style={styles.container}>
      <CalendarComponent setSorting={setDateSorting} />
      <View style={{ marginTop: moderateScale(180), flex: 1 }}>
        <UnCompletedTaskList sortingDate={dateSorting}  compleateList={unComple} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1 ,
    backgroundColor:'#000'
  }
})