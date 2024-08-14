import React from 'react'
import { useFormikContext } from 'formik'

import AppDatePicker from '../customComponents/AppDatePicker'
import ErrorMessage from './ErrorMessage'

export default function FormDatePicker({ name, ...otherProps }) {
    const { errors, touched, values, setFieldValue } = useFormikContext()
  return (
    <>
      <AppDatePicker 
          value={values[name]}
          onChange={(date) => setFieldValue(name, date._d)}
          {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
}
