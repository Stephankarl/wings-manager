import React from 'react'
import * as Yup from 'yup'

import { Form, FormButton, FormInput } from '../../formComponents'
import { Box, Button, Typography } from '@mui/material'

export default function RegisterUser() {

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        base: '',
        companyName: '',
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required().label('First Name'),
        lastName: Yup.string().required().label('Last Name'),
        email: Yup.string().required().email().label('Email'),
        password: Yup.string().required().min(6).label('Password'),
        confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match').label('Confirm Password'),
        base: Yup.string().required().label('Base'),
    })

    const onSubmit = values => {
        console.log(values)
    }


  return (
    <>
        <Typography variant='h4' align='center' gutterBottom>Register</Typography>
        <Form initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <FormInput name='firstName' title='First Name' />
            <FormInput name='lastName' title='Last Name' />
            <FormInput name='email' title='Email' />
            <FormInput name='password' title='Password' type='password' />
            <FormInput name='confirmPassword' title='Confirm Password' type='password' />
            <Typography variant='p' align='center' gutterBottom>This is set to Private as default if you are not operating through a company.</Typography>
            <FormInput name='companyName' title='Company Name' />
            <FormInput name='base' title='Base (4 letter ICAO code)' />
            <Box p={2} display='flex'>
                <Button type='reset' variant='outlined' color='secondary' sx={{ mx: 1 }} fullWidth>Back</Button>
                <Button type='submit' variant='contained' color='primary' sx={{ mx: 1 }} fullWidth >Next</Button>
            </Box>
        </Form>
    </>
  )
}
