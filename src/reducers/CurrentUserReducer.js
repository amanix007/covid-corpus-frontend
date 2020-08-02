import { LOGOUT_USER, LOGIN_USER_SUCCESS, INFO_ID, USER_CHANGE_PROFILE_PHOTO } from "../actions";

export const currentUserReducer = (state, action) => {
    console.log('currentUserReducer', action);
    switch (action.type) {
        case LOGIN_USER_SUCCESS:            
            const newState = { ...state, currentUser: action.loginUser };            
            return newState;
        case LOGOUT_USER: 
            return {...state, currentUser: null};
        case INFO_ID:
            return { ...state, infoId: action.infoId };
        // case USER_CHANGE_PROFILE_PHOTO: 
        //     let x = {
        //         ...state, 
        //         currentUser: {
        //             ...state.currentUser, 
        //             user: {
        //                     ...state.currentUser.user, 
        //                     profilePhoto: action.profilePhoto
        //                 }
        //             }
        //         };
        //     return x;
        default:
            return state;
    }
};