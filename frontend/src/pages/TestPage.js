import React from 'react'
import ProfileDocuments from '../components/customComponents/ProfileDocuments/ProfileDocuments'
import DocumentAccordion from '../components/customComponents/ProfileDocuments/DocumentAccordion'
import { Grid } from '@mui/material'

export default function TestPage() {
  const imgUrl = null
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} lg={6}>
        <div>Test Page</div>
      </Grid>
    </Grid>
  )
}
