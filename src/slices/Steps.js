import * as React from 'react'
import { RichText } from 'prismic-reactjs'
import { graphql } from 'gatsby'
import { CTAButtons } from '../components/CTAButtons'
import cx from 'classnames'
import * as style from './Steps.module.css'

export const Steps = ({ slice: { primary, items }, contact }) => {
  const steps = items.map((item, i) => (
    <div key={i} className={style.stepContainer}>
      <div className="md:mx-auto my-auto md:my-0">
        <img src={item.icon.url} style={{ maxWidth: "90px" }} />
      </div>

      <div className="flex flex-col pl-0 pr-5 md:px-0 w-full md:w-auto">
        <div className={style.stepDetails}>
          <div
            className={cx({
              "h-px grow my-auto -ml-5 mr-7 hidden md:block": true,
              "md:border border-gray-300": i !== 0,
            })}
          ></div>

          <div className="w-7 h-7 text-white rounded-full bg-blue-400 md:mx-2">
            {i + 1}
          </div>
          <div
            className={cx({
              "h-px grow my-auto ml-2": true,
              "md:border border-gray-300": i !== items.length - 1,
            })}
          ></div>
        </div>

        
          <div className="font-semibold font-display">
            <RichText render={item.title.raw} />
          </div>
          <div className="text-sm">
            <RichText render={item.description.raw} />
          </div>
        
      </div>
    </div>
  ));

  return (
    <div className={ style.componentContainer }>
      <div className={ style.componentContainerInner }>
        <div className={ style.componentTitle }>
          <RichText render={primary.title.raw} />
        </div>

        <div className="my-10">
          <RichText render={primary.description.raw} />
        </div>

        <div className="flex gap-5 flex-col md:flex-row">{steps}</div>

        <div className="flex items-center m-auto flex-col flex-col-reverse md:flex-row"></div>
      </div>

      <CTAButtons
        primaryLabel={primary.rotulo_botao_primario}
        primaryLink={primary.link_botao_primario}
        centered={true}
      />
    </div>
  );
}

export const query = graphql`
  fragment LandingDataBodySteps on PrismicLandingDataBodySteps {
    id
    items {
      description {
        raw
      }
      icon {
        url
      }
      title {
        raw
      }
    }
    primary {
      eyebrow_headline {
        raw
      }
      title {
        raw
      }
      description {
        raw
      }
      link_botao_primario
      rotulo_botao_primario
    }
  }
`;

