import * as React from 'react'

import { Hero } from '../slices/Hero'
import { Benefits } from '../slices/Benefits'
import { Feature } from '../slices/Feature'
import { Faq } from '../slices/Faq'
import { Fees } from '../slices/Fees'
import { Steps } from '../slices/Steps'
import { SaqueBmg } from '../slices/SaqueBmg'

export const SliceZone = ({ sliceZone, contact }) => {
  const sliceComponents = {
    hero: Hero,
    beneficios: Benefits,
    funcionalidades: Feature,
    faq_section: Faq,
    taxas: Fees,
    steps: Steps,
    saque_consignado: SaqueBmg,
  }

  let lastType = ''
  const sliceGroups = []

  sliceZone.forEach((slice, index) => {
    if (slice === null) {
      return
    }
    const SliceComponent = sliceComponents[slice.slice_type]
    if (!SliceComponent) {
      return
    }

    if (lastType !== slice.slice_type) {
      sliceGroups.push([])
    }
    lastType = slice.slice_type

    sliceGroups[sliceGroups.length - 1].push(
      <SliceComponent
        slice={slice}
        key={`slice-${index}`}
        id={index}
        contact={contact}
      />
    )
  })

  const content = sliceGroups.map((item, index) => (
    <div key={index}>{item}</div>
  ))

  return <div>{content}</div>
}
