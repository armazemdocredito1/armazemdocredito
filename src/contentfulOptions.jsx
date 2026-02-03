import { BLOCKS } from '@contentful/rich-text-types'
import React from 'react'

export const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-3">{children}</p>,
  },
}
