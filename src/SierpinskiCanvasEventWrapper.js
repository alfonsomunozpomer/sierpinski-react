import React from 'react'
import PropTypes from 'prop-types'

const MIN_SCALE = 0.025
const WHEEL_ZOOM_STEP = 0.001
const KEY_ZOOM_STEP = 0.25
const KEY_PAN_STEP = 100

import SierpinskiCanvas from './SierpinskiCanvas'

class SierpinskiCanvasEventWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      scale: this.props.scale,
      offsetX: this.props.offsetX,
      offsetY: this.props.offsetY,
      zoomStep: 0.001,
      drag: false,
      dragX: 0,
      dragY: 0
    }

    this._handleWheel = this._handleWheel.bind(this)
    this._handleMouseDown = this._handleMouseDown.bind(this)
    this._handleMouseUp = this._handleMouseUp.bind(this)
    this._handleMouseMove = this._handleMouseMove.bind(this)
    this._handleKeyPress = this._handleKeyPress.bind(this)
    // this._handleTouchStart = this._handleTouchStart.bind(this)
    // this._handleTouchMove = this._handleTouchMove.bind(this)
    // this._handleTouchEnd = this._handleTouchEnd.bind(this)
  }

  render() {
    // tabIndex added to make keyboard navigation possible
    return(
      <div>
        <div ref={(wrapperRef) => { this.wrapperRef = wrapperRef }}
             style={{width: this.props.width, height: this.props.width, margin: `auto`}}
             onWheel={this._handleWheel}
             onMouseDown={this._handleMouseDown}
             onMouseUp={this._handleMouseUp}
             onMouseMove={this._handleMouseMove}
             onKeyPress={this._handleKeyPress}
             tabIndex={0}>
          <SierpinskiCanvas width={this.props.width}
                            scale={this.state.scale}
                            offsetX={this.state.offsetX}
                            offsetY={this.state.offsetY}/>
        </div>
        <p>
          Mouse navigation: drag with primary mouse button to pan, use mouse wheel to zoom<br/>
          Keyboard navigation: press Tab to focus on the canvas and use WASD to pan, E/Q to zoom, X to reset view
        </p>
        <p><a href="https://github.com/alfonsomunozpomer/sierpinski-react">Source code available on GitHub</a></p>
      </div>
    )
  }

  _handleWheel(event) {
    event.preventDefault()

    // const rect = this.wrapperRef.getBoundingClientRect()
    // const x = event.clientX - rect.left
    // const y = event.clientY - rect.top

    if (Math.log2(Math.round(this.state.scale)) === Math.round(Math.log2(this.state.scale))) {
      this.setState({
        zoomStep: Math.round(this.state.scale) * WHEEL_ZOOM_STEP
      })
    }

    this.setState({
        scale: Math.max(this.state.scale + this.state.zoomStep * event.deltaY, MIN_SCALE)
    })
  }

  _handleMouseDown(event) {
    event.preventDefault()

    if (event.button === 0) {
      this.setState({
        drag: true,
        dragX: event.clientX,
        dragY: event.clientY
      })
    }
  }

  _handleMouseUp(event) {
    event.preventDefault()

    this.setState({
      drag: false
    })
  }

  _handleMouseMove(event) {
    event.preventDefault()

    if (this.state.drag) {
      const deltaOffsetX = event.clientX - this.state.dragX
      const deltaOffsetY = event.clientY - this.state.dragY

      this.setState({
        dragX: event.clientX,
        dragY: event.clientY,
        offsetX: this.state.offsetX + deltaOffsetX,
        offsetY: this.state.offsetY + deltaOffsetY
      })
    }
  }

  _handleKeyPress(event) {
    event.preventDefault()

    if(event.key === `e` || event.key === `E`) {
      this.setState({
        scale: this.state.scale + KEY_ZOOM_STEP,
      })
    } else if (event.key === `q` || event.key === `Q`) {
      this.setState({
        scale: this.state.scale - KEY_ZOOM_STEP
      })
    } else if (event.key === `w` || event.key === `W`) {
      this.setState({
        offsetY: this.state.offsetY - KEY_PAN_STEP
      })
    } else if (event.key === `s` || event.key === `S`) {
      this.setState({
        offsetY: this.state.offsetY + KEY_PAN_STEP
      })
    } else if (event.key === `a` || event.key === `A`) {
      this.setState({
        offsetX: this.state.offsetX - KEY_PAN_STEP
      })
    } else if (event.key === `d` || event.key === `D`) {
      this.setState({
        offsetX: this.state.offsetX + KEY_PAN_STEP
      })
    } else if (event.key === `x` || event.key === `X`) {
      this.setState({
        scale: 1.0,
        offsetX: 0,
        offsetY: 0
      })
    }
  }

  // _handleTouchStart(event) {
  //   event.preventDefault()
  //
  //   if (event.touches.length === 1) {
  //     this.setState({
  //       drag: true,
  //       dragX: event.clientX,
  //       dragY: event.clientY
  //     })
  //   }
  //
  //   if (event.touches.length === 2) {
  //     // pinch
  //   }
  // }
  //
  // _handleTouchMove(event) {
  //   event.preventDefault()
  //
  //   if (event.touches.length === 1) {
  //     if (this.state.drag) {
  //       const deltaOffsetX = event.clientX - this.state.dragX
  //       const deltaOffsetY = event.clientY - this.state.dragY
  //
  //       this.setState({
  //         dragX: event.clientX,
  //         dragY: event.clientY,
  //         offsetX: this.state.offsetX + deltaOffsetX,
  //         offsetY: this.state.offsetY + deltaOffsetY,
  //       })
  //     }
  //   }
  //
  //   if (event.touches.length === 2) {
  //     // pinch
  //   }
  // }
  //
  // _handleTouchEnd(event) {
  //   event.preventDefault()
  //
  //   if (event.touches.length === 1) {
  //     this.setState({
  //       drag: false
  //     })
  //   }
  //
  //   if (event.touches.length === 1) {
  //   }
  // }
}

SierpinskiCanvasEventWrapper.propTypes = {
  scale: PropTypes.number,
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  width: PropTypes.number
}

SierpinskiCanvasEventWrapper.defaultProps = {
  scale: 1.0,
  offsetX: 0,
  offsetY: 0,
  width: 600
}

export default SierpinskiCanvasEventWrapper
