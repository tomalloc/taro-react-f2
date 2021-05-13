import React, { Component } from 'react'
import F2Canvas from '@/components/j-canvas'

import {Chart} from "@antv/f2/lib/core"

import '@antv/f2/lib/geom/line'
import '@antv/f2/lib/geom/point'

import Tooltip from '@antv/f2/lib/plugin/tooltip'





export default class LineChart extends Component {
  onInit = (config) => {
    const data = [{
      day: '周一',
      value: 300
    }, {
      day: '周二',
      value: 400
    }, {
      day: '周三',
      value: 350
    }, {
      day: '周四',
      value: 500
    }, {
      day: '周五',
      value: 490
    }, {
      day: '周六',
      value: 600
    }, {
      day: '周日',
      value: 900
    }];
    Chart.plugins.register([Tooltip]);
    const chart = new Chart(config);

    chart.source(data, {
      value: {
        tickCount: 5,
        min: 0
      },
      day: {
        range: [ 0, 1 ]
      }
    });
    chart.tooltip({
      showCrosshairs: true,
      showItemMarker: false,
      onShow: function onShow(ev) {
        const items = ev.items;
        items[0].name = null;
        items[0].value = '$ ' + items[0].value;
      }
    });
    chart.axis('day', {
      label: function label(text, index, total) {
        const textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.line().position('day*value');
    chart.point().position('day*value').style({
      stroke: '#fff',
      lineWidth: 1
    });
    data.forEach(function(obj) {
      chart.guide().text({
        position: [ obj.day, obj.value ],
        content: obj.value,
        style: {
          textBaseline: 'bottom',
          textAlign: 'center'
        },
        offsetY: -2
      });
    });

    chart.render();
    return chart
  }

  render () {
    return (
      <F2Canvas
        onInit={this.onInit.bind(this)}
      />

    )
  }
}
