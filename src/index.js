import React from 'react'
import ReactDOM from 'react-dom'

import SierpinskiCanvasEventWrapper from './SierpinskiCanvasEventWrapper'

const render = (options, target) => {
  ReactDOM.render(<SierpinskiCanvasEventWrapper {...options} />, document.getElementById(target))
}

export {SierpinskiCanvasEventWrapper as default, render}
