import axios from 'axios';
import * as actions from '../api';

import handleToken from '../utils/handleToken'

const baseURL = '/api/'

const api = ({ dispatch }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action)

    const { url, method, data, onStart, onSuccess, onError } = action.payload

    const bearerToken = localStorage.getItem('authToken') //Need to change this to use the token from a secure cookie

    if (onStart) dispatch({ type: onStart })

    next(action)

    try {

        const config = {
            headers: { 
                Authorization: `Bearer ${bearerToken}`
            }
        }

        if (onSuccess === 'documents/userDocumentUploaded') {
            config.headers['Content-Type'] = 'multipart/form-data'
        }

        const res = await axios.request({
            baseURL,
            url,
            method,
            headers: config.headers,
            data
        })

        switch (onSuccess) {
            case 'user/authCallSuccess':
                handleToken.storeAuthToken(res.data.data)
                break;
            case 'USER_LOGOUT':
                handleToken.removeToken()
                break;
            default:
                break;
        }

        dispatch(actions.apiCallSuccess(res.data))
        dispatch({ type: onSuccess, payload: res.data})
    } catch (err) {
        dispatch(actions.apiCallFailed(err.message))
        dispatch({ type: onError, payload: err.message })
    }
}

export default api