import React from 'react'
import classNames from 'classnames'
import * as style from './Button.module.css'

const Button = (props) => {
  return (
    <button
      type="button"
      {...props}
      className={classNames({
        [style.button]: true,
        [props.className]: true,
        [style.primary]: props.type === 'submit' || props.type === undefined,
      })}
    >
      {props.children}
    </button>
  )
}

export default Button
