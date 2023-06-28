import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { set_toast_data } from '../modules/toast.module';
import { actionType } from '../actions/ActionsTypes';
import { IRootState } from '../modules';
import { IToastMessage } from '@interfaces/Common';

const useToast = () => {
  const {
    toastShow,

  } = useSelector((state:IRootState) => state.toastReducer);

  const dispatch = useDispatch();

  // 헤더의 활성여부
  const setToastShow = useCallback(async(message: IToastMessage) => {
    dispatch(set_toast_data(actionType.set_toast_show, message));
  },[dispatch]);


  return {
    toastShow,
    setToastShow
  }
}

export default useToast;