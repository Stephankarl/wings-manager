import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function NavButton({ name, path, width = '100%' }) {
    const navigate = useNavigate()
  return (
    <Button variant='contained' sx={{ width, marginTop: 2 }} onClick={() => navigate(path)} >{name}</Button>
  )
}
