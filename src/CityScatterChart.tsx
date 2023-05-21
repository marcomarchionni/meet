import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Schema$Event } from './interfaces/google-interfaces';

interface ChartProps {
  events: Schema$Event[];
  locations: string[];
}

const CityScatterChart = ({ events, locations }: ChartProps) => {
  const [chartData, setChartData] = useState<Object[]>([]);

  useEffect(() => {
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location,
      ).length;
      const city = location.split(/[,-]/).shift();
      return { city, number };
    });
    setChartData(data);
  }, [events, locations]);

  return (
    <ResponsiveContainer height={400} className="scatter-chart">
      <ScatterChart
        margin={{
          top: 20,
          right: 0,
          bottom: 10,
          left: 0,
        }}>
        <CartesianGrid stroke="#cccccc" strokeDasharray="3 3" />
        <XAxis
          dataKey="city"
          type="category"
          name="City"
          stroke="#cccccc"
          tickLine={false}
          tick={{ fill: '#757575' }}
          fontSize="14px"
        />
        <YAxis
          dataKey="number"
          type="number"
          allowDecimals={false}
          name="Number of Events"
          stroke="#cccccc"
          tickLine={false}
          tick={{ fill: '#757575' }}
          fontSize="14px"
        />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{
            color: 'red',
            fontSize: '14px',
            textAlign: 'left',
          }}
          wrapperStyle={{ outline: 'none' }}
        />
        <Scatter name="Events" data={chartData} fill="#96B0AF" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityScatterChart;
