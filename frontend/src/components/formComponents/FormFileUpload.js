import React from 'react'
import { useFormikContext } from 'formik'

import { TextField } from '@mui/material'
import ErrorMessage from './ErrorMessage'

export default function FormInput({ name, title, type = 'text', accept = 'image/*', width = '100%', ...otherProps }) {
    const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext()
  return (
    <>
        <TextField
            onBlur={() => setFieldTouched(name)}
            onChange={ e => setFieldValue(name, e.target.files[0]) }
            title={title}
            type={type}
            accept={accept}
            sx={{ width, marginTop: 1 }}
            {...otherProps}
        />
        <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
}