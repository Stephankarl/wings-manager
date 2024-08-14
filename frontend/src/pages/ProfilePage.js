import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Typography } from '@mui/material'

import ProfileDocuments from '../components/customComponents/ProfileDocuments/ProfileDocuments'
import { getUserInfo, getUserDocumentsUrls } from '../store/slices/users'

export default function ProfilePage() {
    const dispatch = useDispatch()
  
    const user = useSelector(state => state.user.currentUser)
    const userData = useSelector(state => state.user.userData)
    const userLoading = useSelector(state => state.user.loading)
    const documentsLoading = useSelector(state => state.documents.loading)
    
    useEffect(() => {
      dispatch(getUserInfo())
    }, [])


    const { address, bankDetails } = userData

    if (userLoading) return <Typography variant='h4'>Loading...</Typography>

    if(userData.address) {
      return (
        <Grid container spacing={5}>
            <Grid item xs={12}lg={4}>
                <Typography variant='h4'>Profile</Typography>
                <Typography>Name: {user.firstName} {user.lastName}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Phone Number: {userData.phoneNumber.countryCode} {userData.phoneNumber.number}</Typography>
                <Typography>Default Rate: {userData.defaultRate}</Typography>
                <Typography>Target: {userData.target}</Typography>
            </Grid>
            <Grid item xs={12}lg={4}>
                <Typography variant='h4'>Address:</Typography>
                <Typography>Street: {address.street}</Typography>
                <Typography>Apartment: {address.apartment}</Typography>
                <Typography>City: {address.city}</Typography>
                <Typography>State: {address.state}</Typography>
                <Typography>Zip Code: {address.zip}</Typography>
            </Grid>
            <Grid item xs={12}lg={4}>
                <Typography variant='h4'>Bank Details:</Typography>
                <Typography>Bank: {bankDetails.bankName}</Typography>
                <Typography>Account Number: {bankDetails.accountNumber}</Typography>
                <Typography>Routing Number: {bankDetails.routingNumber}</Typography>
                <Typography>Account Type: {bankDetails.accountType}</Typography>
            </Grid>
            <Grid container item justifyContent='center'>
              <Grid item xs={12}lg={6}>
                  <ProfileDocuments />
              </Grid>
            </Grid>
        </Grid>
      )
    }

    return (
      <div>Data not loading.</div>
    )

}
