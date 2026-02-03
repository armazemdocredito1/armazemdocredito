import React, { useEffect } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import classnames from 'classnames'

import { Button } from './form'

const Wizard = ({ children, stepChange, step, stage, totalSteps, currentGlobalStep, canNavigate }) => {
  return (
    <>
      {children}

      <div className="justify-self-end mt-auto self-end w-full flex">
        <Button
          className={classnames({
            'mt-5': true,
            hidden: (step === 0 && stage === 0) || !canNavigate,
          })}
          type="button"
          onClick={() => stepChange(step - 1)}
        >
          <div>
            <FaAngleLeft className="inline mb-[2px]" /> Voltar
          </div>
        </Button>
        <Button
          type="submit"
          className={classnames({ 'mt-5 ml-auto': true, hidden: !canNavigate })}
        >
          <div>
            {currentGlobalStep !== totalSteps - 1 ? 'Avançar' : 'Finalizar'}{' '}
            <FaAngleRight className="inline mb-[2px]" />
          </div>
        </Button>
      </div>
    </>
  )
}

export default Wizard
