import React from 'react'
import PropTypes from 'prop-types'

import Sierpinski from './Sierpinski'

const SIN_PI_3_RAD = Math.sin(Math.PI / 3)
const HORIZONTAL_PADDING = 50
// Number in pixels of bounding side length of smallest triangle
const DRAW_LIMIT = 10
const ANIMATION_FRAMES = 5

class SierpinskiCanvas extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sierpinskiTrianglePaths:
        Sierpinski(
          this.props.width / 2, 2 * SIN_PI_3_RAD * this.props.width / 3, this.props.width - HORIZONTAL_PADDING,
          Math.round(DRAW_LIMIT / this.props.scale))
    }
  }

  render() {
    return (
      <canvas ref={(canvasRef) => { this.canvasContext = canvasRef.getContext(`2d`) }}
              width={this.props.width}
              height={this.props.width}
              style={{border: `1px solid black`}}/>
    )
  }

  componentDidMount() {
    this.state.sierpinskiTrianglePaths.forEach((path) => this.canvasContext.fill(path))
  }

  // Only re-render if width changes, otherwise we’ll handle a nifty animation in componentWillReceiveProps
  shouldComponentUpdate(nextProps) {
    return nextProps.width !== this.props.width
  }

  componentWillReceiveProps(nextProps) {
    const scaleIncrement = (nextProps.scale - this.props.scale) / ANIMATION_FRAMES
    const offsetXIncrement = (nextProps.offsetX - this.props.offsetX) / ANIMATION_FRAMES
    const offsetYIncrement = (nextProps.offsetY - this.props.offsetY) / ANIMATION_FRAMES

    let thisScale = this.props.scale
    let thisOffsetX = this.props.offsetX
    let thisOffsetY = this.props.offsetY
    let frameCount = 0

    if (Math.round(10 / nextProps.scale) !== Math.round(10 / this.props.scale)) {
      this.setState({
        sierpinskiTrianglePaths:
        Sierpinski(
          this.props.width / 2, 2 * SIN_PI_3_RAD * this.props.width / 3, this.props.width - HORIZONTAL_PADDING,
          Math.round(DRAW_LIMIT / nextProps.scale))
      })
    }

    const _animationLoop = () => {
      thisScale = thisScale + scaleIncrement
      thisOffsetX = thisOffsetX + offsetXIncrement
      thisOffsetY = thisOffsetY + offsetYIncrement

      this.canvasContext.clearRect(0, 0, this.props.width, this.props.width)
      this.canvasContext.setTransform(thisScale, 0, 0, thisScale, thisOffsetX, thisOffsetY)
      this.state.sierpinskiTrianglePaths.forEach((triangle) => this.canvasContext.fill(triangle))
      this.canvasContext.setTransform(1, 0, 0, 1, 0, 0)

      frameCount = frameCount + 1
      if (frameCount < ANIMATION_FRAMES) {
        requestAnimationFrame(_animationLoop)
      }
    }

    _animationLoop()
  }
}

SierpinskiCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  offsetX: PropTypes.number.isRequired,
  offsetY: PropTypes.number.isRequired
}

export default SierpinskiCanvas
