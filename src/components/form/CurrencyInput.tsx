import React from 'react'
import { MaskedInput } from './MaskedInput'
import { FormComponent } from './InputComponent'

const getMask = (rawValue) => {
  const value = rawValue.replace(/\D/g, '')
  return (value || '')
    .split('')
    .reverse()
    .reduce((acc, curr, i) => {
      if (i % 3 === 0 && i !== 0) {
        acc.push('.', curr)
      } else {
        acc.push(curr)
      }
      return acc
    }, [])
    .reverse()
    .join('')
}

const CurrencyInput = ({
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
      <div className="flex">
        <span className="leading px-3 py-2 border rounded-l bg-gray-100 text-gray-500">
          R$
        </span>
        <MaskedInput
          mask={getMask}
          register={register}
          name={name}
          inputMode="numeric"
          {...rest}
          className="rounded-r border-gray-300"
        />
      </div>
    </FormComponent>
  )
}

export default CurrencyInput
