import { Typography } from '@mui/material'
import React from 'react'

export default function ErrorMessage({ error, visible}) {
  if (!visible || !error) return null
    return (
        <Typography color='red'>{error}</Typography>
    )
}
