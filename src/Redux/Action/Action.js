import { CHANGE_VOICE, CHANGE_STATUS, CHANGE_STATUS_MODAL } from './Constant';

export const changeVoice = (val) => ({
    type: CHANGE_VOICE,
    payload: val
});

export const changeStatus = (val) => ({
    type: CHANGE_STATUS,
    payload: val
});

export const changeStatusModal = (val) => ({
    type: CHANGE_STATUS_MODAL,
    payload: val
});
