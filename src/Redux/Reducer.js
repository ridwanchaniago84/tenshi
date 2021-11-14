import {
    CHANGE_VOICE,
    CHANGE_STATUS,
    CHANGE_STATUS_MODAL,
    REFRESH_APP,
    CHANGE_VOICE_CHARACTER
} from './Action/Constant';

const initialState = {
    voiceText: '',
    statusAI: false,
    statusModal: false,
    listApp: [],
    voiceCh: {
        name: '',
        language: '',
        compact: ''
    }
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
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
        case CHANGE_STATUS_MODAL:
            return {
                ...state,
                statusModal: action.payload
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
