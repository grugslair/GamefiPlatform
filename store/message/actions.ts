import { createAction } from "@reduxjs/toolkit"
import { IMessageState } from "./messageType";

export const pushMessageAction = createAction<IMessageState>('message/pushMessage');
export const resetMessageAction = createAction('message/resetMessage');

