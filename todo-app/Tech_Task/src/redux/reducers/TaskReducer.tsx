// reducers/taskReducer.js
import { produce } from "immer";
import {
  LISTING_TASKS,
  EDITING_TASKS,
  REMOVE_TASKS,
  LISTING_TASKS_SUCCESS,
  REMOVE_TASKS_SUCCESS,
  EDITING_TASKS_SUCCESS,
  ADDING_TASKS,
  TOGGLE_TASK_COMPLETION_SUCCESS,
  REMOVE_COMPLETED_TASK_SUCCESS,
  MARK_UNCOMPLETED,
  REMOVE_UNCOMPLETED_TASK_SUCCESS,
  LIST_UNCOMPLETED_TASKS_SUCCESS,
} from "../type";

const initialState = {
  tasks: [],
  completedTasks: [],
  uncompletedTasks: [],
  error: null,
};

const taskReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LISTING_TASKS_SUCCESS:
        draft.tasks = action.payload;
        draft.error = null;
        break;
      case REMOVE_TASKS_SUCCESS:
        draft.tasks = draft.tasks.filter((task) => task.id !== action.payload);
        draft.error = null;
        break;
      case EDITING_TASKS_SUCCESS:
        draft.tasks = draft.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
        draft.error = null;
        break;
      case ADDING_TASKS:
        draft.tasks.push(action.payload);
        draft.error = null;
        break;
      case TOGGLE_TASK_COMPLETION_SUCCESS:
        const task = draft.tasks.find((t) => t.id === action.payload);
        if (task) {
          draft.completedTasks.push(task);
          draft.tasks = draft.tasks.filter((t) => t.id !== action.payload);
        } else {
          const completedTask = draft.completedTasks.find(
            (t) => t.id === action.payload
          );
          if (completedTask) {
            draft.tasks.push(completedTask);
            draft.completedTasks = draft.completedTasks.filter(
              (t) => t.id !== action.payload
            );
          }
        }
        draft.error = null;
        break;
      case REMOVE_COMPLETED_TASK_SUCCESS:
        draft.completedTasks = draft.completedTasks.filter(
          (task) => task.id !== action.payload
        );
        draft.error = null;
        break;
      case MARK_UNCOMPLETED:
        const uncompletedTask = draft.tasks.find(
          (t) => t.id === action.payload
        );
        if (uncompletedTask) {
          draft.uncompletedTasks.push(uncompletedTask);
          draft.tasks = draft.tasks.filter((t) => t.id !== action.payload);
        }
        draft.error = null;
        break;
      case REMOVE_UNCOMPLETED_TASK_SUCCESS:
        draft.uncompletedTasks = draft.uncompletedTasks.filter(
          (task) => task.id !== action.payload
        );
        draft.error = null;
        break;
      case LIST_UNCOMPLETED_TASKS_SUCCESS:
        draft.uncompletedTasks = action.payload;
        draft.error = null;
        break;
      default:
        break;
    }
  });

export default taskReducer;
