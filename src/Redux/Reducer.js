import { CHANGE_VOICE, CHANGE_STATUS, CHANGE_STATUS_MODAL, REFRESH_APP } from './Action/Constant';

const initialState = {
    voiceText: '',
    statusAI: false,
    statusModal: false,
    listApp: []
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
        default:
            return state;
    }
};

export default reducer;
