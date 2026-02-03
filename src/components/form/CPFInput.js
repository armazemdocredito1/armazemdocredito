import React from 'react'
import { MaskedInput } from './MaskedInput'
import { FormComponent } from './InputComponent'

const CPFInput = ({
  label,
  register,
  name,
  errors,
  touchedFields,
  helperText,
  customMask,
  ...rest
}) => {
  return (
    <FormComponent
      label={label}
      name={name}
      errors={errors}
      touchedFields={touchedFields}
      helperText={helperText}
    >
      <MaskedInput
        mask={customMask || '000.000.000-00'}
        register={register}
        name={name}
        {...rest}
        inputMode="numeric"
      />
    </FormComponent>
  )
}

export default CPFInput
