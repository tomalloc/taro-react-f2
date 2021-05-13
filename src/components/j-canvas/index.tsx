import React from 'react'
import Taro from '@tarojs/taro'
import { Canvas } from '@tarojs/components'

import { my as F2Context } from '@antv/f2-context'

export interface CanvasProps {
  id: string
  className: string
  style: string
  onInit: any
}

export interface CanvasState {
  id: string
}

function wrapEvent(e) {
  if (!e) return
  if (!e.preventDefault) {
    e.preventDefault = function() {}
  }
  return e
}


export default class F2Canvas extends React.Component<CanvasProps,CanvasState> {
  static INSTANCE_COUNTER = 0;

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id||'f2-canvas-' + F2Canvas.INSTANCE_COUNTER++,
    };
  }

  static defaultProps = {
    className: '',
    style: '',
    onInit: () => {}
  }

  canvasEl: any
  chart: any

  componentWillMount() {
    setTimeout(() => {
      if (process.env.TARO_ENV === 'alipay'||process.env.TARO_ENV === 'dd') {
        this.onAlipayCanvas()
      } else if (process.env.TARO_ENV === 'weapp') {
        this.onWxCanvas()
      }
    }, 100)
  }
  // alipay canvas
  onAlipayCanvas() {
    const id = this.state.id;
    const ctx = Taro.createCanvasContext(id)
    const context = F2Context(ctx)

    const query = Taro.createSelectorQuery()
    query.select('#' + id)
      .boundingClientRect()
      .exec(res => {
        // 获取画布实际宽高
        const { width, height } = res && res[0] ? res[0] : this.props;
        if (!width || !height) return
        //const pixelRatio = Taro.getSystemInfoSync().pixelRatio
        const pixelRatio = 1;

        const config = { context, width, height ,pixelRatio}
        const chart = this.props.onInit(config)
        if (chart) {
          this.chart = chart
          this.canvasEl = chart.get('el')
        }


      })
  }

  // weapp canvas
  onWxCanvas() {
    const query = Taro.createSelectorQuery()

    query.select('#' + this.state.id)
      .fields({
        node: true,
        size: true
      }).exec(res => {
        let { node, width, height } = res[0]
        const context = node.getContext('2d')
        const pixelRatio = Taro.getSystemInfoSync().pixelRatio
        // 高清设置
        node.width = width * pixelRatio
        node.height = height * pixelRatio

        const config = { context, width, height, pixelRatio }
        const chart = this.props.onInit(config)
        if (chart) {
          this.chart = chart
          this.canvasEl = chart.get('el')
        }
      })
  }

  touchStart(e){
    const canvasEl = this.canvasEl
    if (canvasEl) {
      canvasEl.dispatchEvent('touchstart', wrapEvent(e))
    }
  }
  touchMove(e){
    const canvasEl = this.canvasEl
    if (canvasEl) {
      canvasEl.dispatchEvent('touchmove', wrapEvent(e))
    }
  }
  touchEnd(e){
    const canvasEl = this.canvasEl
    if (canvasEl) {
      canvasEl.dispatchEvent('touchend', wrapEvent(e))
    }
  }

  render() {
    return (
      <Canvas
        className={this.props.className}
        style={this.props.style}
        type="2d"
        id={this.state.id}
        canvasId={this.state.id}
        onTouchStart={this.touchStart.bind(this)}
        onTouchMove={this.touchMove.bind(this)}
        onTouchEnd={this.touchEnd.bind(this)}
      />
    )
  }
}
