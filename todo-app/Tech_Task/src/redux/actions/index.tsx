import {
  ADDING_TASKS,
  COMPLEATED_TASK,
  COMPLETED_TASK,
  COMPLETING_TASKS,
  EDITING_TASKS,
  LISTING_TASKS,
  LIST_UNCOMPLETED_TASKS,
  LIST_UNCOMPLETED_TASKS_FAILURE,
  LIST_UNCOMPLETED_TASKS_SUCCESS,
  LOGIN_USER,
  MARK_UNCOMPLETED,
  REGISTER_USER,
  REMOVE_COMPLETED_TASK,
  REMOVE_TASKS,
  REMOVE_UNCOMPLETED_TASK,
  REMOVE_UNCOMPLETED_TASK_FAILURE,
  REMOVE_UNCOMPLETED_TASK_SUCCESS,
  TOGGLE_TASK_COMPLETION,
} from "../type";

export const registerState = (Reg: any) => ({
  type: REGISTER_USER,
  payload: Reg,
});

export const loginState = (Log: any) => ({
  type: LOGIN_USER,
  payload: Log,
});

export const ListingTask = (List: any) => ({
  type: LISTING_TASKS,
  payload: List,
});

export const RemoveTasks = (Remove: any) => ({
  type: REMOVE_TASKS,
  payload: Remove,
});

export const EditingTasks = (Editing: any) => ({
  type: EDITING_TASKS,
  payload: Editing,
});

export const AddingTasks = (Add: any) => ({
  type: ADDING_TASKS,
  payload: Add,
});


export const CompleateTask = (Compleate) => ({
  type: COMPLETED_TASK,
  payload: Compleate,
});

export const CompleteTask = (taskId) => ({
  type: COMPLETING_TASKS,
  payload: taskId,
});

export const ToggleTaskCompletion = (taskId) => ({
  type: TOGGLE_TASK_COMPLETION,
  payload: taskId,
});

export const RemoveCompletedTask = (taskId) => ({
  type: REMOVE_COMPLETED_TASK,
  payload: taskId,
});

export const markUncompleted = (taskId) => ({
  type: MARK_UNCOMPLETED,
  payload: taskId,
});

export const removeUncompletedTask = (taskId) => ({
  type: REMOVE_UNCOMPLETED_TASK,
  payload: taskId,
});

export const removeUncompletedTaskSuccess = (taskId) => ({
  type: REMOVE_UNCOMPLETED_TASK_SUCCESS,
  payload: taskId,
});

export const removeUncompletedTaskFailure = (error) => ({
  type: REMOVE_UNCOMPLETED_TASK_FAILURE,
  payload: error,
});

export const listUncompletedTasks = () => ({
  type: LIST_UNCOMPLETED_TASKS,
});

export const listUncompletedTasksSuccess = (tasks) => ({
  type: LIST_UNCOMPLETED_TASKS_SUCCESS,
  payload: tasks,
});

export const listUncompletedTasksFailure = (error) => ({
  type: LIST_UNCOMPLETED_TASKS_FAILURE,
  payload: error,
});