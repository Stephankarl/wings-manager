import React from 'react'
import RegisterUser from '../components/customComponents/RegisterComponents/RegisterUser'
import { Grid } from '@mui/material'

export default function RegisterPage() {
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <RegisterUser />
      </Grid>
    </Grid>
  )
}
