import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { DatePicker, FileUpload, Form, FormButton } from '../../formComponents'
import { addUserDocument } from '../../../store/slices/documents'
import { useNavigate } from 'react-router-dom'

export default function DocumentUpload({ name }) {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.documents.loading)

  const initialValues = {
    file: null,
    expiryDate: new Date(),
    name: name
  }

  const validationSchema = Yup.object().shape({
    file: Yup.mixed().required('File is required'),
    expiryDate: Yup.date().required('Expiry Date is required')
  })


  const onSubmit = async (values) => {
    dispatch(addUserDocument(values))
  }

  if (loading) return <div>Loading...</div>
    
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <FileUpload name='file' type='file' />
      <DatePicker name='expiryDate' label='Expiry Date' />
      <FormButton title='Upload' variant='contained' width='100%' size='small' />
    </Form>
  )
}
