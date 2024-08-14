import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'

import { apiCallBegan } from '../api';
import { authUrl, usersUrl } from '../config/api';

const slice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        loading: false,
        currentUser: {},
        userData: {},
        message: null
    },
    reducers: {
        onStart: (state) => {
            state.message = null
            state.loading = true
        },

        authCallSuccess: (state, { payload }) => {
            if (!payload.success) {
                state.message = {
                    type: 'error',
                    msg: payload.message
                }
                state.loading = false
            } else {
                const user = jwtDecode(payload.data)
                state.loggedIn = true
                state.message = {
                    type: 'success',
                    msg: payload.message
                }
                state.currentUser = user
                state.loading = false
            }
        },

        authCallFailed: (state, { payload }) => {
            if (!payload.success) {
                console.log(payload)
                state.message = {
                    type: 'error',
                    code: payload.code,
                    msg: payload.message
                }
                state.loading = false
            }
        },

        userCallSuccess: (state, { payload }) => {
            const userData = jwtDecode(payload.data)
            state.userData = userData
            state.loading = false
        },

        userUpdated: (state, { payload }) => {
            state.currentUser = payload
        },

        userCallFail: (state, action) => {
            state.message = {
                type: 'error',
                msg: 'Something went wrong...'
            }
            state.loading = false
        }
    }
})

const { onStart,
        authCallSuccess,
        authCallFailed,
        userCallSuccess,
        userUpdated,
        userCallFail
    } = slice.actions

export default slice.reducer

//Action Creator
export const registerUser = data => apiCallBegan({
    url: `${authUrl}/register`,
    method: 'post',
    data,
    onStart: onStart.type,
    onSuccess: authCallSuccess.type,
    onError: authCallFailed.type
})

export const loginUser = data => apiCallBegan({
    url: `/auth/login`,
    method: 'post',
    data,
    onStart: onStart.type,
    onSuccess: authCallSuccess.type,
    onError: authCallFailed.type
})

export const authenticateUser = () => apiCallBegan({
    url: `auth/authenticate`,
    onStart: onStart.type,
    onSuccess: authCallSuccess.type,
    onError: authCallFailed.type
})

export const logoutUser = () => apiCallBegan({
    url: `auth/logout`,
    onStart: onStart.type,
    onSuccess: 'USER_LOGOUT',
    onError: userCallFail.type
})

export const getUserInfo = () => apiCallBegan({
    url: `users`,
    onStart: onStart.type,
    onSuccess: userCallSuccess.type,
    onError: userCallFail.type
})

export const updateUser = data => apiCallBegan({
    url: `${usersUrl}/${data._id}`,
    method: 'patch',
    data,
    onStart: onStart.type,
    onSuccess: userUpdated.type,
    onError: userCallFail.type
})