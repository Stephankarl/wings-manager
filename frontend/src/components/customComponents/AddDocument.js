import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

export default function AddDocument() {
    const navigate = useNavigate()
  return (
    <Box
        sx={{ p: 1, m: 1, display: 'inline-block' }}
        onClick={() => navigate('/contract/new')}
    >
        <Paper elevation={1} sx={{ justifyContent: 'center', alignItems: 'center', width: 200, height: 240, display: 'flex' }}>
            <AddIcon sx={{ fontSize: 80 }} color='primary' />
        </Paper>
    </Box>
  )
}
