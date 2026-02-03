import React from 'react'
import { gtagReportConversion } from '../utils/google-tracking'

export const CTAButtons = ({
  primaryLabel,
  primaryLink,
  secondaryLabel,
  secondaryLink,
  centered,
  reverted,
}) => {
  let onClick = (href) =>
    href.startsWith('#') ? null : () => gtagReportConversion(href)

  const primary = primaryLabel && (
    <a
      className="btn btn-orange"
      key="1"
      href={primaryLink}
      onClick={onClick(primaryLink)}
    >
      {primaryLabel}
    </a>
  )

  const secondary = secondaryLabel && (
    <a
      className="btn btn-outline-orange"
      key="2"
      href={secondaryLink}
      onClick={onClick(secondaryLink)}
    >
      {secondaryLabel}
    </a>
  )

  let buttons = null
  if (primary || secondary) {
    buttons = [primary || null, secondary || null]
    return (
      <div
        className={
          'w-full text-center space-x-3 pt-5' + (centered ? '' : ' md:text-left')
        }
      >
        {reverted ? buttons.reverse() : buttons}
      </div>
    )
  }

  return null
}
