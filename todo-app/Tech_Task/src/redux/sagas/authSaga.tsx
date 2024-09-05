// src/sagas/authSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LOGIN_SUCCESS,
  LOGIN_USER,
  LOGIN_FAILURE,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_USER,
} from "../type";
// Import any navigation utilities or actions as needed

function* loginUser(action : any) {
  try {
    const { email, password } = action.payload;
    const storedUser = yield call(AsyncStorage.getItem, email);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.password === password) {
        yield put({ type: LOGIN_SUCCESS, payload: parsedUser });
      } else {
        yield put({ type: LOGIN_FAILURE, payload: "Invalid password" });
      }
    } else {
      yield put({ type: LOGIN_FAILURE, payload: "User not found" });
    }
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error.message });
  }
}

function* registerUser(action : any) {
  try {
    const { _id, user, email, password } = action.payload;

    // Check if user already exists
    const existingUser = yield call(AsyncStorage.getItem, email);
    if (existingUser) {
      yield put({ type: REGISTER_FAILURE, payload: "User already exists" });
      return; // Exit early if user already exists
    }

    // If user doesn't exist, proceed with registration
    const data = { _id, user, email, password };
    yield call(AsyncStorage.setItem, email, JSON.stringify(data));
    yield put({ type: REGISTER_SUCCESS, payload: data });

    // You should handle navigation in your React component, not here
    // Example: navigation.navigate('SuccessScreen');
  } catch (error) {
    yield put({ type: REGISTER_FAILURE, payload: error.message });
  }
}

function* authSaga() {
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(REGISTER_USER, registerUser);
}

export default authSaga;
