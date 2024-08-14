import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { getOneContract } from '../store/slices/contracts'
import UploadButton from '../components/customComponents/Buttons/UploadButton'

import { Grid, Typography } from '@mui/material'
import NavButton from '../components/customComponents/Buttons/NavButton'

export default function ContractPage() {
    const { id } = useParams()
    const contract = useSelector(getOneContract(id))
    
  return (
    <Grid container>
      <Grid item xs={12} lg={6} py={4} sx={{ textAlign: 'center' }}>
        <Typography variant='h4'>{contract.agent}</Typography>
        <Typography variant='h6'>{moment(contract.startDate).format(`DD MMM`)} - {moment(contract.endDate).format(`DD MMM`)}</Typography>
        <Typography variant='h6'>{contract.totalDays} days</Typography>
        <Typography variant='h6'>Rate: ${contract.rate}</Typography>
        <Typography variant='h6'>Total: ${contract.totalIncome}</Typography>
      </Grid>
      <Grid item xs={12} lg={6} py={4} sx={{ textAlign: 'center' }}>
        <Typography variant='h4'>Expenses</Typography>
        <Typography variant='h6'>Total Expense:</Typography>
      </Grid>
      <Grid item xs={12} lg={6} py={4} sx={{ textAlign: 'center' }}>
        <Typography variant='h4'>Contract Handle</Typography>
        <UploadButton width='80%' />
        <NavButton name='Edit Contract' path={`/contract/${id}/edit`} width='80%' />
      </Grid>
      <Grid item xs={12} lg={6} py={4} sx={{ textAlign: 'center' }}>
        <Typography variant='h4'>Invoice</Typography>
      </Grid>
    </Grid>
  )
}
