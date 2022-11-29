import { notification } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { pushMessageAction, resetMessageAction } from "store/message/actions";
import { IMessageState } from "store/message/messageType";
import { useAppDispatch } from "./useStoreHooks";

const useMessage = () => {
  const message = useSelector((state: RootState) => state.message)
  const dispatch = useAppDispatch();

  const pushMessage = (status:string, payload: IMessageState) => {
    const data: IMessageState = {
      title: '',
      description: '',
      style: {}
    }
    if(status === 'success') {
      data.title = payload.title,
      data.description = payload.description,
      data.style = {
        backgroundColor: '#15873D',
      }
    }
    if(status === 'failed') {
      data.title = payload.title,
      data.description = payload.description,
      data.style = {
        backgroundColor: '#890D30'
      }
    }
    dispatch(pushMessageAction(data))
  }

  useEffect(() => {
    if(message.description !== '') {
      notification.info({
        message: message.title,
        description: message.description,
        style: message.style,
        className: 'message-notification',
      });

      clearMessage()
    }
  }, [message.description])

  const clearMessage = () => {
    dispatch(resetMessageAction())
  }


  return {
    clearMessage,
    pushMessage,
  }
}

export default useMessage