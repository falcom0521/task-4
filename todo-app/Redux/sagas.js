import { call, put, takeEvery } from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import { schedulePushNotification } from './notifications';

function* addTask(action) {
    try {
        const taskRef = yield call(firestore().collection('tasks').add, action.payload);
        const newTask = { id: taskRef.id, ...action.payload };
        yield put({ type: 'ADD_TASK_SUCCESS', payload: newTask });
        yield call(schedulePushNotification, newTask);
    } catch (e) {
        yield put({ type: 'ADD_TASK_FAILED', message: e.message });
    }
}

function* fetchTasks() {
    try {
        const snapshot = yield call(firestore().collection('tasks').get);
        const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        yield put({ type: 'SET_TASKS', payload: tasks });
    } catch (e) {
        yield put({ type: 'FETCH_TASKS_FAILED', message: e.message });
    }
}

function* watchTaskActions() {
    yield takeEvery('ADD_TASK_REQUEST', addTask);
    yield takeEvery('FETCH_TASKS_REQUEST', fetchTasks);
}

export default function* rootSaga() {
    yield all([
        watchTaskActions(),
    ]);
}
