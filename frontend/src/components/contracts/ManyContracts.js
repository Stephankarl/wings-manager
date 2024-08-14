import React from 'react'
import { useSelector } from 'react-redux'

import { Grid } from '@mui/material'
import ContractCard from './ContractCard'

export default function ManyContracts() {
    const contracts = useSelector(state => state.contracts.list)
  return (
    <Grid container>
        {contracts.map(contract => (
            <Grid item key={contract._id}>
                <ContractCard id={contract._id} />
            </Grid>
        ))}
    </Grid>
  )
}
