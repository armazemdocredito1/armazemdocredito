import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

const FaqItem = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  return (
    <div className="max-w-3xl m-auto py-4 border-b faq-item">
      <dt
        className={
          'cursor-pointer flex justify-between items-center' +
          (showAnswer ? ' active' : '')
        }
        onClick={toggleAnswer}
      >
        <span className="mr-2">{question}</span>
      </dt>
      <dd className={'pt-3 text-blue-gray-500' + (showAnswer ? '' : ' hidden')}>
        {answer}
      </dd>
    </div>
  )
}

FaqItem.propTypes = {
  question: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
}

export const Faq = ({ slice }) => {
  const questions = slice.items.map((item, index) => (
    <FaqItem
      question={<RichText render={item.pergunta.raw} />}
      answer={<RichText render={item.resposta.raw} />}
      key={index}
    />
  ))

  return (
    <div
      className="max-w-screen-xl mx-auto items-center p-10 px-5 sm:pb-16 border-t"
      id="perguntas"
    >
      <div className="text-3xl tracking-tighter font-bold mb-10 font-display text-center">
        <RichText render={slice.primary.titulo.raw} />
      </div>
      <dl className="p-margin">{questions}</dl>
    </div>
  )
}

export const query = graphql`
  fragment LandingDataBodyFaqSection on PrismicLandingDataBodyFaqSection {
    items {
      pergunta {
        raw
      }
      resposta {
        raw
      }
    }
    primary {
      titulo {
        raw
      }
    }
  }
`
