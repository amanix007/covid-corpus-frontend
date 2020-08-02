import { INFO_ID } from "../actions";

export const InfoReducer = (state, action) => {
    switch (action.type) {
        case INFO_ID:
            const newState = { ...state, infoId: action.infoId };            
            return newState;       
        default:
            return state;
    }
};