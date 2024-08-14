const handleToken = {
    storeAuthToken: (token) => {
        localStorage.setItem('authToken', token)
    },
    removeToken: () => {
        localStorage.removeItem('authToken')
    }
}

export default handleToken