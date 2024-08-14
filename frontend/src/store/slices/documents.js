import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '../api';
import { jwtDecode } from 'jwt-decode';

const slice = createSlice({
    name: 'documents',
    initialState: {
        loading: false,
        userDocuments: [],
        message: null,
    },
    reducers: {
        onStart: (state) => {
            state.message = null
            state.loading = true
        },
        userDocumentsLoaded: (state, { payload }) => {
            state.userDocuments = payload.data
            state.loading = false
        },
        userDocumentUploaded: (state, { payload }) => {
            state.userDocuments.push(payload.data)
            state.loading = false
        },
        userDocumentDeleted: (state, { payload }) => {
            const i = state.userDocuments.findIndex( d => d.fileName === payload.data)
            if (i > -1) state.userDocuments.splice(i, 1)
            state.message = payload.message
            state.loading = false
        },
        documentCallFail: (state, { payload }) => {
            state.message = {
                type: 'error',
                code: payload.code,
                msg: payload.message
            }
            state.loading = false
        }
    }
})

const { onStart,
        userDocumentUploaded,
        userDocumentsLoaded,
        userDocumentDeleted,
        documentCallFail
    } = slice.actions

export default slice.reducer

//Action Creator
export const getUserDocuments = () => apiCallBegan({
    url: `documents`,
    onStart: onStart.type,
    onSuccess: userDocumentsLoaded.type,
    onError: documentCallFail.type
})

export const addUserDocument = data => apiCallBegan({
    url: `documents/`,
    method: 'post',
    data,
    onStart: onStart.type,
    onSuccess: userDocumentUploaded.type,
    onError: documentCallFail.type
})

export const deleteDocument = data => apiCallBegan({
    url: `documents`,
    method: 'delete',
    data,
    onStart: onStart.type,
    onSuccess: userDocumentDeleted.type,
    onError: documentCallFail.type
})
