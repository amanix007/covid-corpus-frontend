import { currentUserReducer } from './CurrentUserReducer';
import { InfoReducer } from './InfoReducer';

const reducers = (state, action) => {
    
    const currentUserState = currentUserReducer(state, action);
         
    const newState = {
        ...currentUserState
    }

    return newState;
} 

export default reducers;