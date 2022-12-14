import { notification } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { pushMessageAction, resetMessageAction } from "store/message/actions";
import { IMessageState } from "store/message/messageType";
import { useAppDispatch } from "../hooks/useStoreHooks";


export const pushMessage = (status:string, payload: IMessageState, dispatch:any) => {
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

export const clearMessage = (dispatch: any) => {
  dispatch(resetMessageAction())
}


const Notification = ({children}: any) => {
  const message = useSelector((state: RootState) => state.message)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(message.description !== '') {
      notification.info({
        message: message.title,
        description: message.description,
        style: message.style,
        className: 'message-notification',
      });

      clearMessage(dispatch)
    }
  }, [message.description])

  


  return children
}

export default Notification