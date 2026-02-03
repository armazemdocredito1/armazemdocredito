export const gtagReportConversion = (url) => {
  if (typeof window !== 'undefined' && window.gtag !== undefined) {
    var callback = function () {
      if (typeof url != 'undefined') {
        window.location = url
      }
    }
    window.gtag('event', 'conversion', {
      send_to: 'AW-954363374/P02KCKX9pJADEO7biccD',
      event_callback: callback,
    })
  }

  return false
}

export const gtag = (...params) => {
  if (window.gtag) {
    window.gtag(...params)
  }
}
