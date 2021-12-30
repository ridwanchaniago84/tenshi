import {
    CHANGE_VOICE,
    CHANGE_STATUS,
    REFRESH_APP,
    CHANGE_VOICE_CHARACTER,
    CHANGE_AVATAR,
    EDIT_APP_INFO
} from './Action/Constant';

const initialState = {
    appInfo: {
        modal: false,
        name: '',
        package: ''
    },
    avatar: '',
    voiceText: '',
    statusAI: false,
    listApp: [],
    voiceCh: {
        name: '',
        language: '',
        compact: ''
    }
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case EDIT_APP_INFO:
            return {
                ...state,
                appInfo: {
                    modal: action.payload.modal,
                    name: action.payload.name,
                    package: action.payload.package
                }
            }
        case CHANGE_AVATAR:
            return {
                ...state,
                avatar: action.payload
            }
        case CHANGE_VOICE:
            return {
                ...state,
                voiceText: action.payload
            }
        case CHANGE_STATUS:
            return {
                ...state,
                statusAI: action.payload
            }
        case REFRESH_APP:
            return {
                ...state,
                listApp: action.payload
            }
        case CHANGE_VOICE_CHARACTER:
            return {
                ...state,
                voiceCh: {
                    name: action.payload.name,
                    language: action.payload.language,
                    compact: action.payload.compact
                }
            }
        default:
            return state;
    }
};

export default reducer;
