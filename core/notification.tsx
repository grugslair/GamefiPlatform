import { useEffect } from "react";
import { notification } from "antd";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { IMessageState } from "store/message/messageType";
import { pushMessageAction, resetMessageAction } from "store/message/actions";

// utils
import { useAppDispatch } from "hooks/useStoreHooks";

export const pushMessage = (payload: IMessageState, dispatch: any) => {
  let data: IMessageState = {
    status: payload.status,
    title: payload.title,
    description: payload.description,
    style: payload.style || {},
    icon: undefined,
  };
  if (payload.status === "success") {
    data.icon = (
      <FontAwesomeIcon icon={faCheckCircle} className="text-xl text-white" />
    );
    data.style = { backgroundColor: "#15873D", ...data.style };
  }
  if (payload.status === "error") {
    data.icon = (
      <FontAwesomeIcon icon={faTimesCircle} className="text-xl text-white" />
    );
    data.style = { backgroundColor: "#890D30", ...data.style };
  }
  dispatch(pushMessageAction(data));
};

export const clearMessage = (dispatch: any) => {
  dispatch(resetMessageAction());
};

const Notification = ({ children }: any) => {
  const message = useSelector((state: RootState) => state.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message.description !== "") {
      notification.open({
        message: message.title,
        description: message.description,
        style: message.style,
        icon: message.icon,
        className: "message-notification",
        closeIcon: (
          <FontAwesomeIcon icon={faTimes} className="text-lg text-white" />
        ),
      });

      clearMessage(dispatch);
    }
  }, [message.description]);

  return children;
};

export default Notification;
