import React from 'react'
import { MaskedInput } from './MaskedInput'
import { FormComponent } from './InputComponent'

const BenefitInput = ({
  label,
  register,
  name,
  errors,
  touchedFields,
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
        mask="0000000000"
        register={register}
        name={name}
        {...rest}
      />
    </FormComponent>
  )
}

export default BenefitInput
