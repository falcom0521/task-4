import { produce } from "immer";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_USER,
  REGISTER_FAILURE,
  LOGIN_USER,
} from "../type";

const initialState = {
    isAuthenticated: false,
    user: {},
    error: null,
  };

  const authReducer = (state = initialState, action : any) => 
    produce(state, draft => {
      switch (action.type) {
        case LOGIN_SUCCESS:
          draft.isAuthenticated = true;
          draft.user = action.payload;
          draft.error = null;
          break;
        case REGISTER_SUCCESS:
          draft.isAuthenticated = true;
          draft.user = action.payload;
          draft.error = null;
          break;
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
          draft.isAuthenticated = false;
          draft.user = {};
          draft.error = action.payload;
          break;
        default:
          break;
      }
    });

    export default authReducer;
