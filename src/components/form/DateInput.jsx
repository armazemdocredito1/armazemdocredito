import React from 'react'
import { MaskedInput } from './MaskedInput'
import { FormComponent } from './InputComponent'

const DateInput = ({
  label,
  register,
  name,
  errors,
  touchedFields,
  control,
  ...rest
}) => {
  return (
    <FormComponent
      label={label}
      name={name}
      errors={errors}
      touchedFields={touchedFields}
    >
      <MaskedInput
        mask="00/00/0000"
        register={register}
        name={name}
        inputMode="numeric"
        {...rest}
      />
    </FormComponent>
  )
}

export default DateInput
