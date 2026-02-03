import React from 'react'
import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'
import { FormComponent } from './InputComponent'

interface ICategory {
  value: string
  label: string
}

const Select = ({
  label,
  name,
  errors,
  touchedFields,
  control,
  options,
  ...props
}) => {
  delete props.ref

  return (
    <FormComponent
      label={label}
      name={name}
      errors={errors}
      touchedFields={touchedFields}
    >
      <Controller
        render={({ field: { onChange, value, ...field } }) => {
          return (
            <ReactSelect
              className="mt-1 leading-7 border-gray-300"
              options={options}
              onChange={(selectedOption: ICategory) => {
                onChange(selectedOption.value)
              }}
              value={
                options.find((option: ICategory) => option.value === value) ||
                ''
              }
              placeholder="Selecione…"
              {...props}
              {...field}
            />
          )
        }}
        name={name}
        control={control}
      />
    </FormComponent>
  )
}

export default Select
