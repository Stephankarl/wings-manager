import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DocumentAccordion from './DocumentAccordion'
import { getUserDocuments } from '../../../store/slices/documents'

import { Typography } from '@mui/material'

export default function ProfileDocuments() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserDocuments())
  },[])

  const loading = useSelector(state => state.documents.loading)
  const documents = useSelector(state => state.documents.userDocuments)

  const docsArray = ['FAA_Liscense', 'Medical', 'Passport', 'International_Procedures', 'Drivers_License']

  if(loading) return (<div>Loading...</div>)

  return (
    <div>
      
      <Typography variant='h4' mb={5}>Documents</Typography>
      {docsArray.map( (fixedDoc, i) => {
        const doc = documents.find( d => fixedDoc.includes(d.name))
        if (doc) {
          return <DocumentAccordion key={i} name={fixedDoc} doc={doc} documentUrl={doc.documentUrl} expiryDate={doc.expiryDate} />
        } else {
          return <DocumentAccordion key={i} name={fixedDoc} />
        }
      })}
    </div>
  )
}