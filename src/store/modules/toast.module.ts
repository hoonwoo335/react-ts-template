import { actionType } from '../actions/ActionsTypes';
import { IToastMessage } from "@interfaces/Common";

interface InitialState {
  toastShow: IToastMessage
} 

interface DispatchAction {
  type: string;
  payload: IToastMessage;
}

const initState: InitialState = {
  toastShow: {type:0, msg:""}
}

export const set_toast_data = (type: string, payload: IToastMessage) => ({
  type,
  payload
});

const toastReducer = (state = initState, action: DispatchAction) => {
  switch(action.type) {
    case actionType.set_toast_show:
      return { 
        ...state, 
        toastShow: action.payload as IToastMessage
      };
    default:
      return state;
  }
}

export default toastReducer;