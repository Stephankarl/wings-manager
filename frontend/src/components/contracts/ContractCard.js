import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import { getOneContract } from '../../store/slices/contracts'

export default function ContractCard({ id }) {
  const navigate = useNavigate()
  const contract = useSelector(getOneContract(id))
  const { startDate, endDate, agent, status, retainer, totalDays, totalIncome }  = contract
  return (
    <Box
        sx={{ p: 1, m: 1, display: 'inline-block' }}
        onClick={() => navigate(`/contract/${id}`)}
    >
        <Paper elevation={1} sx={{ width: 200, height: 240, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant='h6' align='center'>Contract</Typography>
            <Typography variant='body1' align='center'>{retainer ? 'Retainer' : null }</Typography>
            <Typography variant='body1' align='center'>{agent}</Typography>
            <Typography variant='body1' align='center'>{ moment(startDate).format('DD-MMM') } - {moment(endDate).format('DD-MMM')}</Typography>
            <Typography variant='body1' align='center'>{totalDays} days</Typography>
            <Typography variant='body1' align='center'>${totalIncome}</Typography>
            <Typography variant='body1' align='center'>{status}</Typography>
        </Paper>
    </Box>
  )
}

