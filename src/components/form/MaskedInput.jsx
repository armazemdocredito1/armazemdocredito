import React from 'react'
import Mask from '../../utils/mask'
import classnames from 'classnames'

export const MaskedInput = ({ register, name, mask, ...rest }) => {
  let getNewValue
  if (typeof mask === 'function') {
    getNewValue = mask
  } else {
    const maskObj = new Mask(mask)
    getNewValue = (value) => {
      return maskObj.getMasked(value)
    }
  }

  return (
    <input
      type="text"
      {...register(name, {
        onChange: (event) =>
          (event.target.value = getNewValue(event.target.value)),
        setValueAs: (value) => getNewValue(value),
      })}
      defaultValue=""
      {...rest}
      className={classnames([rest.className, 'form-input'])}
    />
  )
}
