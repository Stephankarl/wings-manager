import { combineReducers } from 'redux';
import contractReducers from './slices/contracts';
import userReducers from './slices/users';
import documentReducers from './slices/documents'

const appReducer = combineReducers({ 
    contracts: contractReducers,
    user: userReducers,
    documents: documentReducers
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') 
        return appReducer(undefined, action)
    return appReducer(state, action)
}

export default rootReducer
