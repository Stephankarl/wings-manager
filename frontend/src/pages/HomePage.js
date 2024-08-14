import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadContracts } from '../store/slices/contracts'

import ManyContracts from '../components/contracts/ManyContracts'
import AddDocument from '../components/customComponents/AddDocument'
import { Grid } from '@mui/material'
import { authenticateUser } from '../store/slices/users'
import handleToken from '../store/utils/handleToken'

export default function HomePage() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const contractsLoading = useSelector(state => state.contracts.loading)
  
  useEffect(() => {
    if(!user.loggedIn) {
      dispatch(authenticateUser())
    }
    dispatch(loadContracts())
  }, [])

  if(user.loading || contractsLoading) return <div>Loading...</div>

  return (
    <Grid container>
        <ManyContracts />
        <AddDocument />
    </Grid>
  )
}
