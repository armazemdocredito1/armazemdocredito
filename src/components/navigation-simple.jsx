import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames/bind'

import * as style from './navigation.module.css'

const cx = classNames.bind(style)

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const logo =
      'https://images.prismic.io/armazemdocredito/e7540520-54cd-46f6-aef6-858f360edfbc_teste2.png?auto=compress,format'

    return (
      <div className="border-b max-w-screen-xl font-display">
        <nav
          className="px-6 w-full"
          style={{ minHeight: 'var(--navbar-height)' }}
        >
          <div
            className={
              'flex items-center justify-between py-6 text-gray-700 my-0 ' +
              (this.props.type === 'formalizacao' ? 'flex-wrap' : '')
            }
          >
            <div className="flex items-center flex-shrink-0 text-white mr-2">
              <img
                src={logo}
                className={cx({ navbarImg: logo, navbarImgExtraLarge: true })}
                alt="BMG Card"
              />
            </div>

            <div className="leading-4 text-sm">
              <p>
                Etapa {this.props.stageIndex + 1} de {this.props.maxStages}
              </p>
              <p
                className="font-semibold text-base"
                style={{ color: '#3e7959' }}
              >
                {this.props.stageName}
              </p>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

Navigation.propTypes = {
  stageIndex: PropTypes.number,
  stageName: PropTypes.string,
  maxStages: PropTypes.number,
  type: PropTypes.string,
}
