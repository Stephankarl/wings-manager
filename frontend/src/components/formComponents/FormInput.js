import React from 'react'
import { useFormikContext } from 'formik'

import { TextField } from '@mui/material'
import ErrorMessage from './ErrorMessage'

export default function FormInput({ name, title, type = 'text', width = '100%', ...otherProps }) {
    const { setFieldTouched, handleChange, errors, touched, values } = useFormikContext()
  return (
    <>
        <TextField
            onBlur={() => setFieldTouched(name)}
            onChange={handleChange(name)}
            value={values[name]}
            title={title}
            label={title}
            type={type}
            sx={{ width, marginTop: 1 }}
            {...otherProps}
        />
        <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
}
