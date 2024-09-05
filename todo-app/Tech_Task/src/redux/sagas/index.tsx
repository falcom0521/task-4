import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import taskSaga from './taskSaga'; // import the taskSaga

export default function* rootSaga() {
  yield all([
    authSaga(),
    taskSaga(), // include the taskSaga
  ]);
}
