import React from 'react'
import classnames from 'classnames'

export const FormComponent = ({
  label,
  name,
  errors,
  touchedFields,
  children,
  helperText,
  className,
}) => {
  const helper = errors[name]?.message || helperText

  return (
    <label className={classnames([className, 'mb-2'])}>
      <span className="block font-semibold">{label}</span>
      {children}
      <p
        className={classnames({
          'text-sm text-gray-500 mt-1': true,
          'text-red-600': errors[name],
        })}
      >
        {helper}
      </p>
    </label>
  )
}
