import { CHANGE_VOICE, CHANGE_STATUS, CHANGE_STATUS_MODAL } from './Action/Constant';

const initialState = {
    voiceText: '',
    statusAI: false,
    statusModal: false
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
        default:
            return state;
    }
};

export default reducer;
