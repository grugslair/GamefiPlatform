import { notification } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { pushMessageAction, resetMessageAction } from "store/message/actions";
import { IMessageState } from "store/message/messageType";
import { useAppDispatch } from "./useStoreHooks";

const useMessage = () => {
  const message = useSelector((state: RootState) => state.message)
  const dispatch = useAppDispatch();


  const pushMessage = (status:string) => {
    if(status === 'success') {
      const data = {
        title: 'Successfully unstake token',
        description: 'You’ve unstake 2000 ROCKS',
        style: {
          backgroundColor: 'green'
        }
      }
      dispatch(pushMessageAction(data))
    }
  }

  const openMessage = () => {
    notification.open({
      message: message.title,
      description: message.description,
      style: message.style,
    });
  }

  const clearMessage = () => {
    dispatch(resetMessageAction())
  }


  return {
    openMessage,
    clearMessage,
    pushMessage
  }
}

export default useMessage