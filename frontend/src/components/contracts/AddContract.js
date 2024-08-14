import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import moment from 'moment'

import { DatePicker, Form, FormButton, FormInput, Switch } from '../formComponents'
import { Grid, Typography } from '@mui/material'
import { addContract } from '../../store/slices/contracts';

export default function AddContract() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    agent: '',
    rate: 2500,
    retainer: false,
    startDate: new Date(),
    endDate: new Date(),
    w_two: true
  }

  const validationSchema = Yup.object().shape({
    agent: Yup.string().required('Agent is required'),
    rate: Yup.number().required('Rate is required'),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date().min(
      Yup.ref('startDate'),
      ({ min }) => `End date must be equal or after ${moment(min).format('MM/DD/YYYY')}`,
    ),
  })

  const onSubmit = (values) => {
    //BUILD NEW CONTRACT
    values.startDate.setHours(0,0,0,0)
    values.endDate.setHours(0,0,0,0)
    
    const newContract = {
        ...values,
        startDate: Date.parse(values.startDate),
        endDate: Date.parse(values.endDate)
    }

    //Dispatch Action
    dispatch(addContract(newContract))
    navigate(`/`)
}

  return (
    <Grid container spacing={1} justifyContent='center' >
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Grid item xs={8} sx={{ marginTop: 2 }} >
          <Typography variant='h4' align='center'>New Contract</Typography>
        </Grid>

        <Grid container justifyContent='center' item xs={8} >
          <FormInput name='agent' label='Agent' width='60%' />
          <FormInput name='rate' label='Rate' type='number' width='60%' />
        </Grid>

        <Grid container item xs={6} justifyContent='flex-end' sx={{ my: 1}} >
            <Switch name='retainer' label='Retainer' labelPlacement='top' />
        </Grid>

        <Grid container item xs={6} justifyContent='flex-start' sx={{ my: 1}} >
          <Switch name='w_two' label='W2' labelPlacement='top' />
        </Grid>
        
        <Grid item xs={8} >
          <DatePicker name='startDate' label='Start Date' width='60%' />
          <DatePicker name='endDate' label='End Date' width='60%' />
        </Grid>

        <Grid container item xs={12} justifyContent='center' alignItems='center' >
          <FormButton title='Add Contract' size='small' variant='contained' width='35%' />
        </Grid>
          
      </Form>
    </Grid>
  )
}
