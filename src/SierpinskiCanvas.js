import React from 'react'
import PropTypes from 'prop-types'

import {Rectangle} from './Geometry'
import Sierpinski from './Sierpinski'

const SIN_PI_3_RAD = Math.sin(Math.PI / 3)
const HORIZONTAL_PADDING = 50
// Number in pixels of bounding side length of smallest triangle
const DRAW_LIMIT = 10
const ANIMATION_FRAMES = 5

const triangleToPath = (t) => {
  const trianglePath = new Path2D()
  trianglePath.moveTo(t.points[0].x, t.points[0].y)
  trianglePath.lineTo(t.points[1].x, t.points[1].y)
  trianglePath.lineTo(t.points[2].x, t.points[2].y)
  return trianglePath
}

const subdivideEquilateralTriangle = (t) => {
  return [
    new EqTriangle(t.centroid.x - t.sideLength / 4, t.centroid.y + (t.height / 3 - t.height / 6), t.sideLength / 2),
    new EqTriangle(t.centroid.x + t.sideLength / 4, t.centroid.y + (t.height / 3 - t.height / 6), t.sideLength / 2),
    new EqTriangle(t.centroid.x, t.centroid.y - t.height / 3, t.sideLength / 2)
  ]
}

class SierpinskiCanvas extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      depth: 6
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
    Sierpinski(this.props.width / 2, 2 * SIN_PI_3_RAD * this.props.width / 3, this.props.width, this.state.depth)
      .map(triangleToPath)
      .forEach((path) => this.canvasContext.fill(path))
  }

  // Only re-render if width changes, otherwise we’ll do a nifty animation in componentWillReceiveProps
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

    // Minimal rectangle that covers this and next visible rectangle
    const nextRectangle = new Rectangle(
      -nextProps.offsetX / nextProps.scale,
      -nextProps.offsetY / nextProps.scale,
     (-nextProps.offsetX + nextProps.width) / nextProps.scale,
     (-nextProps.offsetY + nextProps.width) / nextProps.scale)

    const nextTriangles =
      Sierpinski(
        this.props.width / 2, 2 * SIN_PI_3_RAD * this.props.width / 3, this.props.width,
        this.state.depth + Math.log2(nextProps.scale), nextRectangle)

    const _animationLoop = () => {
      thisScale = thisScale + scaleIncrement
      thisOffsetX = thisOffsetX + offsetXIncrement
      thisOffsetY = thisOffsetY + offsetYIncrement

      this.canvasContext.clearRect(0, 0, this.props.width, this.props.width)
      this.canvasContext.setTransform(thisScale, 0, 0, thisScale, thisOffsetX, thisOffsetY)
      nextTriangles.map(triangleToPath).forEach((path) => this.canvasContext.fill(path))
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
