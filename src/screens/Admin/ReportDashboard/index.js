/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
} from 'victory-native';
import {DateTime} from 'luxon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  getMonthlyReport,
  getDailyAverage,
} from '../../../utils/https/transaction';

import Loader from '../../../components/Loader';

import global from '../../../styles/global';
import styles from './style';

export default function ReportDashboard() {
  const userToken = useSelector(state => state.auth.data?.token);

  const [monthlyData, setMonthlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getMonthlyReport(userToken)
      .then(res => {
        setMonthlyData(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });

    getDailyAverage(userToken)
      .then(res => {
        setDailyData(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, [userToken]);

  // get the last 6 months
  const lastSixMonths = monthlyData.slice(-6);

  const monthlyChartData = lastSixMonths.map(({month, total_sum}) => ({
    x: month,
    y: parseInt(total_sum, 10),
  }));

  const monthTickValues = lastSixMonths.map(monthData =>
    parseInt(monthData.month, 10),
  );

  const monthTickFormat = lastSixMonths.map(monthData => {
    const monthString = DateTime.fromObject({
      month: parseInt(monthData.month, 10),
    })
      .toFormat('MMM')
      .toLocaleUpperCase();
    return `${monthString}`;
  });

  const monthLegendData = [{name: 'Income', symbol: {fill: '#FFBA33'}}];

  const dailyChartData = dailyData.map(({day_name, average}) => ({
    x: day_name,
    y: parseInt(average, 10),
  }));

  const dailyTickValues = dailyData.map(({day_name}) => day_name);
  const dailyTickFormat = t => {
    const foundDay = dailyData.find(({day_name}) => day_name.startsWith(t));
    return foundDay ? foundDay.day_name.slice(0, 1) : '';
  };

  let highestAvg = Math.max(
    ...dailyData.map(item => parseInt(item.average, 10)),
  );

  return (
    <ScrollView style={[global.px_container]}>
      {isLoading && <Loader />}

      {/* Monthly report start */}
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 50,
          marginBottom: 10,
          borderRadius: 10,
        }}>
        <View style={{paddingHorizontal: 10, paddingTop: 10}}>
          <View style={[styles.chartHeader]}>
            <Text style={[styles.chartTitle]}>Monthly Report</Text>
            <Icon name="dots-horizontal" size={30} color={'#000000'} />
          </View>
          <Text style={[styles.additionalText]}>Last 6 months</Text>
        </View>
        <View>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            padding={{left: 80, right: 80, top: 50, bottom: 50}}>
            <VictoryAxis
              tickValues={monthTickValues}
              tickFormat={monthTickFormat}
            />
            <VictoryAxis dependentAxis />
            <VictoryBar
              data={monthlyChartData}
              x="x"
              y="y"
              style={{data: {fill: '#FFBA33'}}}
            />
            <VictoryLegend data={monthLegendData} y={30} />
          </VictoryChart>
        </View>
      </View>
      {/* Monthly report end */}

      {/* Daily average start */}
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 10,
          marginBottom: 50,
          borderRadius: 10,
        }}>
        <View style={{paddingHorizontal: 10, paddingTop: 10}}>
          <View style={[styles.chartHeader]}>
            <Text style={[styles.chartTitle]}>{`IDR ${highestAvg.toLocaleString(
              'id-ID',
            )}`}</Text>
            <Icon name="dots-horizontal" size={30} color={'#000000'} />
          </View>
          <Text style={[styles.additionalText]}>Daily average</Text>
        </View>
        <View>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            padding={{left: 80, right: 80, top: 50, bottom: 50}}>
            <VictoryAxis dependentAxis />
            <VictoryAxis
              tickValues={dailyTickValues}
              tickFormat={dailyTickFormat}
            />
            <VictoryBar
              data={dailyChartData}
              x="x"
              y="y"
              style={{data: {fill: '#FFBA33'}}}
            />
            <VictoryLegend data={monthLegendData} y={10} />
          </VictoryChart>
        </View>
      </View>
      {/* Daily average end */}
    </ScrollView>
  );
}
