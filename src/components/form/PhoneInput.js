import React, { useState } from 'react'
import Mask from '../../utils/mask'
import { MaskedInput } from './MaskedInput'
import { FormComponent } from './InputComponent'

const masks = [
  {
    mask: '(00) 0000-0000',
    type: 'landline',
    firstDigit: [2, 3, 4, 5],
  },
  {
    mask: '(00) 00000-0000',
    type: 'cellphone',
    firstDigit: [6, 7, 8, 9],
  },
]

const getMask = (rawValue) => {
  const value = rawValue.replace(/\D/g, '')
  return (
    masks.find(
      (mask) => mask.firstDigit.includes(Number(value[2])) && value.length > 10
    ) || masks[1]
  ).mask
}

const PhoneInput = ({
  label,
  register,
  name,
  errors,
  touchedFields,
  control,
  ...rest
}) => {
  const getNewValue = (value) => {
    const mask = new Mask(getMask(value))
    return mask.getMasked(value)
  }

  return (
    <FormComponent
      label={label}
      name={name}
      errors={errors}
      touchedFields={touchedFields}
    >
      <MaskedInput
        mask={getNewValue}
        register={register}
        name={name}
        {...rest}
        type="tel"
      />
    </FormComponent>
  )
}

export default PhoneInput
