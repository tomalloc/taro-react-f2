import React, { Component } from 'react'
import F2Canvas from '@/components/j-canvas'


import {Chart} from "@antv/f2/lib/core"
import '@antv/f2/lib/geom/interval'


import Tooltip from '@antv/f2/lib/plugin/tooltip'

import Guide from '@antv/f2/lib/plugin/guide'



export default class BarChart extends Component {
  onInit = (config) => {
    const data = [{
      year: '1951 年',
      sales: 38
    }, {
      year: '1952 年',
      sales: 52
    }, {
      year: '1956 年',
      sales: 61
    }, {
      year: '1957 年',
      sales: 145
    }, {
      year: '1958 年',
      sales: 48
    }, {
      year: '1959 年',
      sales: 38
    }, {
      year: '1960 年',
      sales: 38
    }, {
      year: '1962 年',
      sales: 38
    }];
    Chart.plugins.register([Tooltip,Guide]);

    const chart = new Chart(config);

    chart.source(data, {
      sales: {
        tickCount: 5
      }
    });
    chart.tooltip({
      showItemMarker: false,
      onShow: function onShow(ev) {
        const items = ev.items;
        items[0].name = null;
        items[0].name = items[0].title;
        items[0].value = '¥ ' + items[0].value;
      }
    });
    chart.axis('year',{
      label:{
        rotate: -Math.PI / 5,
        textAlign: 'end',
        textBaseline: 'middle',
        fontSize: 10
      }
    });
    data.forEach(function(obj) {
      chart.guide().text({
        position: [ obj.year, obj.sales ],
        content: obj.sales,
        style: {
          textBaseline: 'bottom',
          textAlign: 'center'
        },
        offsetY: -2
      });
    });
    chart.interval().position('year*sales');
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
