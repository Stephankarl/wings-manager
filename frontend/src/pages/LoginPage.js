import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { Form, FormInput, FormButton } from '../components/formComponents'

//Import Functions
import { loginUser } from '../store/slices/users'

//Material UI
import MuiAlert from '@mui/material/Alert';
import { Grid, Typography, Snackbar } from '@mui/material'
import { Link } from 'react-router-dom'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginForm() {
const dispatch = useDispatch()
const message = useSelector(state => state.user.message)

const initialValues = {
    email: 'stephanglobals@gmail.com',
    password: '123456',
}

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password')
})

const onSubmit =  (values) => {
    dispatch(loginUser(values))
}

const [snack, setSnack] = useState(message)

useEffect(() => {
    setSnack(message)
}, [message])

    return (

        <Grid container justifyContent='center' >
            <Grid container item xs={6} sx={styles.loginBox} alignContent='center' spacing={2} >
                <Typography align='center' variant='h4' sx={{ p: 1, m: 1 }}>Login Page</Typography>

                <Form
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    >
                    <FormInput title='Email' name='email' placeholder='Email' />
                    <FormInput title='Password' name='password' type='password' placeholder='Password' />
                    <FormButton title='Login' variant='contained' width='100%' size='small' />
                    <Typography variant='body2' sx={{textAlign: 'center'}}>Don't have an account? <Link style={styles.link} to='/register'>Register</Link></Typography>
                </Form>
            </Grid>
            { snack && 
                <Snackbar open={true} autoHideDuration={6000}>
                    <Alert severity={snack.type}>{snack.msg}</Alert>
                </Snackbar>
            }
        </Grid>
    )
}

const styles = {
    loginBox: {

        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        marginTop: '20px'
    },
    link: {
        textDecoration: 'none',
        color: 'blue'
    }
}