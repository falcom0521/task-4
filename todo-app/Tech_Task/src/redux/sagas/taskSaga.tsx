import { put, call, takeEvery, delay } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LISTING_TASKS_FAILURE,
  EDITING_TASKS,
  EDITING_TASKS_FAILURE,
  EDITING_TASKS_SUCCESS,
  LISTING_TASKS,
  LISTING_TASKS_SUCCESS,
  REMOVE_TASKS,
  REMOVE_TASKS_FAILURE,
  REMOVE_TASKS_SUCCESS,
  ADDING_TASKS,
  COMPLETING_TASKS_FAILURE,
  COMPLETING_TASKS,
  COMPLETING_TASKS_SUCCESS,
  TOGGLE_TASK_COMPLETION_SUCCESS,
  TOGGLE_TASK_COMPLETION_FAILURE,
  REMOVE_COMPLETED_TASK_SUCCESS,
  REMOVE_COMPLETED_TASK_FAILURE,
  TOGGLE_TASK_COMPLETION,
  REMOVE_COMPLETED_TASK,
  MARK_UNCOMPLETED,
  REMOVE_UNCOMPLETED_TASK_SUCCESS,
  REMOVE_UNCOMPLETED_TASK_FAILURE,
  REMOVE_UNCOMPLETED_TASK,
  LIST_UNCOMPLETED_TASKS_SUCCESS,
  LIST_UNCOMPLETED_TASKS_FAILURE,
  LIST_UNCOMPLETED_TASKS,
} from '../type';
import { isBefore } from 'date-fns';

// Save tasks to AsyncStorage
function* saveTasksToStorage(tasks) {
  try {
    yield call(AsyncStorage.setItem, 'tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
}

// List tasks from AsyncStorage
function* listTasks() {
  try {
    const tasks = yield call(AsyncStorage.getItem, 'tasks');
    const parsedTasks = JSON.parse(tasks) || []; // Default to empty array if null
    yield put({
      type: LISTING_TASKS_SUCCESS,
      payload: parsedTasks,
    });
  } catch (error) {
    yield put({ type: LISTING_TASKS_FAILURE, payload: error.message });
  }
}

// Remove task from AsyncStorage
function* removeTask(action) {
  try {
    const tasks = yield call(AsyncStorage.getItem, 'tasks');
    const parsedTasks = JSON.parse(tasks) || [];
    const updatedTasks = parsedTasks.filter(
      (task) => task.id !== action.payload
    );
    yield call(saveTasksToStorage, updatedTasks);
    yield put({ type: REMOVE_TASKS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: REMOVE_TASKS_FAILURE, payload: error.message });
  }
}

// Edit task in AsyncStorage
function* editTask(action) {
  try {
    const tasks = yield call(AsyncStorage.getItem, 'tasks');
    const parsedTasks = JSON.parse(tasks) || [];
    const updatedTasks = parsedTasks.map((task) =>
      task.id === action.payload.id ? action.payload : task
    );
    yield call(saveTasksToStorage, updatedTasks);
    yield put({ type: EDITING_TASKS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: EDITING_TASKS_FAILURE, payload: error.message });
  }
}

// Add task to AsyncStorage
function* addTask(action) {
  try {
    const tasks = yield call(AsyncStorage.getItem, 'tasks');
    const parsedTasks = JSON.parse(tasks) || [];
    parsedTasks.push(action.payload);
    yield call(saveTasksToStorage, parsedTasks);
    yield put({ type: LISTING_TASKS, payload: parsedTasks });
  } catch (error) {
    console.error('Failed to add task:', error);
  }
}

// Toggle task completion and update AsyncStorage
function* toggleTaskCompletion(action) {
  try {
    const tasks = yield call(AsyncStorage.getItem, 'tasks');
    const completedTasks = yield call(AsyncStorage.getItem, 'completedTasks');
    const parsedTasks = JSON.parse(tasks) || [];
    const parsedCompletedTasks = JSON.parse(completedTasks) || [];

    const task = parsedTasks.find((t) => t.id === action.payload);
    if (task) {
      parsedCompletedTasks.push(task);
      const remainingTasks = parsedTasks.filter((t) => t.id !== action.payload);
      yield call(saveTasksToStorage, remainingTasks);
      yield call(
        AsyncStorage.setItem,
        'completedTasks',
        JSON.stringify(parsedCompletedTasks)
      );
    } else {
      const completedTask = parsedCompletedTasks.find(
        (t) => t.id === action.payload
      );
      if (completedTask) {
        parsedTasks.push(completedTask);
        const remainingCompletedTasks = parsedCompletedTasks.filter(
          (t) => t.id !== action.payload
        );
        yield call(saveTasksToStorage, parsedTasks);
        yield call(
          AsyncStorage.setItem,
          'completedTasks',
          JSON.stringify(remainingCompletedTasks)
        );
      }
    }
    yield put({
      type: TOGGLE_TASK_COMPLETION_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put({ type: TOGGLE_TASK_COMPLETION_FAILURE, payload: error.message });
  }
}

// Remove completed task from AsyncStorage
function* removeCompletedTask(action) {
  try {
    const completedTasks = yield call(AsyncStorage.getItem, 'completedTasks');
    const parsedCompletedTasks = JSON.parse(completedTasks) || [];
    const updatedCompletedTasks = parsedCompletedTasks.filter(
      (task) => task.id !== action.payload
    );
    yield call(
      AsyncStorage.setItem,
      'completedTasks',
      JSON.stringify(updatedCompletedTasks)
    );
    yield put({ type: REMOVE_COMPLETED_TASK_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: REMOVE_COMPLETED_TASK_FAILURE, payload: error.message });
  }
}

// Remove uncompleted task from AsyncStorage
function* removeUncompletedTask(action) {
  try {
    const uncompletedTasks = yield call(
      AsyncStorage.getItem,
      'uncompletedTasks'
    );
    const parsedUncompletedTasks = JSON.parse(uncompletedTasks) || [];
    const updatedUncompletedTasks = parsedUncompletedTasks.filter(
      (task) => task.id !== action.payload
    );
    yield call(
      AsyncStorage.setItem,
      'uncompletedTasks',
      JSON.stringify(updatedUncompletedTasks)
    );
    yield put({
      type: REMOVE_UNCOMPLETED_TASK_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: REMOVE_UNCOMPLETED_TASK_FAILURE,
      payload: error.message,
    });
  }
}

// Check task times and mark as uncompleted if past due
function* checkTaskTime() {
  while (true) {
    try {
      const tasks = yield call(AsyncStorage.getItem, 'tasks');
      const parsedTasks = JSON.parse(tasks) || [];

      const now = new Date();

      for (const task of parsedTasks) {
        const taskTime = new Date(`${task.date}T${task.time}`);
        if (isBefore(taskTime, now)) {
          yield put({ type: MARK_UNCOMPLETED, payload: task.id });
        }
      }
    } catch (error) {
      console.error('Failed to check task times:', error);
    }

    yield delay(60000); // Check every minute
  }
}

// List uncompleted tasks from AsyncStorage
function* listUncompletedTasks() {
  try {
    const uncompletedTasks = yield call(
      AsyncStorage.getItem,
      'uncompletedTasks'
    );
    yield put({
      type: LIST_UNCOMPLETED_TASKS_SUCCESS,
      payload: JSON.parse(uncompletedTasks) || [],
    });
  } catch (error) {
    yield put({ type: LIST_UNCOMPLETED_TASKS_FAILURE, payload: error.message });
  }
}

// Root saga combining all task-related sagas
export default function* taskSaga() {
  yield takeEvery(LISTING_TASKS, listTasks);
  yield takeEvery(REMOVE_TASKS, removeTask);
  yield takeEvery(EDITING_TASKS, editTask);
  yield takeEvery(ADDING_TASKS, addTask);
  yield takeEvery(TOGGLE_TASK_COMPLETION, toggleTaskCompletion);
  yield takeEvery(REMOVE_COMPLETED_TASK, removeCompletedTask);
  yield takeEvery(REMOVE_UNCOMPLETED_TASK, removeUncompletedTask);
  yield takeEvery(LIST_UNCOMPLETED_TASKS, listUncompletedTasks);
  yield call(checkTaskTime); // Ensure checkTaskTime is called once during saga setup
}
