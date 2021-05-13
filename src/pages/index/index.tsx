import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

import BarChart from "./bar"
import PieChart from "./pie"
import LineChart from "./line"

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className="page-index">
        <View className="chart">
          <BarChart/>
        </View>
        <View className="chart">
          <PieChart/>
        </View>
        <View className="chart">
          <LineChart/>
        </View>
      </View>
    )
  }
}
