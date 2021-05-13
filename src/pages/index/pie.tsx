import React, { Component } from 'react'
import F2Canvas from '@/components/j-canvas'

import {Chart} from "@antv/f2/lib/core"
import '@antv/f2/lib/geom/interval'

import Legend from "@antv/f2/lib/plugin/legend"
import Tooltip from '@antv/f2/lib/plugin/tooltip'

import '@antv/f2/lib/component/guide/text'

import Guide from '@antv/f2/lib/plugin/guide'
import PieLabel from '@antv/f2/lib/plugin/pie-label'

import '@antv/f2/lib/coord/polar'

import '@antv/f2/lib/geom/adjust/stack'




export default class PieChart extends Component {
  onInit = (config) => {
    const data = [{
      const: 'const',
      type: '交通出行',
      money: 51.39
    }, {
      const: 'const',
      type: '饮食',
      money: 356.68
    }, {
      const: 'const',
      type: '生活日用',
      money: 20.00
    }, {
      const: 'const',
      type: '住房缴费',
      money: 116.53
    }];
    Chart.plugins.register([Legend,Tooltip,Guide,PieLabel]);
    const chart = new Chart(config);

    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      radius: 0.9,
      innerRadius: 0.5
    });
    chart.axis(false);
    chart.legend(false);
    chart.tooltip(false);
    const guide = chart.guide()
      .text({
        position: [ '50%', '50%' ],
        content: '',
        style:{
          fontSize: 14
        }
      });
    chart.interval()
      .position('const*money')
      .adjust('stack')
      .color('type', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14' ]);
    chart.pieLabel({
      sidePadding: 30,
      activeShape: true,
      label1: function label1(data) {
        return {
          text: '￥' + data.money,
          fill: '#343434',
          fontWeight: 'bold'
        };
      },
      label2: function label2(data) {
        return {
          text: data.type,
          fill: '#999'
        };
      },
      onClick: function onClick(ev) {
        const data = ev.data;
        if (data) {
          guide.content = data.type+"\n"+data.money;
          guide.repaint();
        }
      }
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
