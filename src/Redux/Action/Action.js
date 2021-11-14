import {
    CHANGE_VOICE,
    CHANGE_STATUS,
    CHANGE_STATUS_MODAL,
    REFRESH_APP,
    CHANGE_VOICE_CHARACTER
} from './Constant';

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

export const refreshApp = (val) => ({
    type: REFRESH_APP,
    payload: val
});

export const changeVoiceCharacter = (val) => ({
    type: CHANGE_VOICE_CHARACTER,
    payload: val
});
