import { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Schema$Event } from './interfaces/google-interfaces';

interface EventGenreChartObject {
  genre: string;
  value: number;
}

interface EventGenreChartProps {
  events: Schema$Event[];
}

const GenrePieChart = ({ events }: EventGenreChartProps) => {
  const [chartData, setChartData] = useState<EventGenreChartObject[]>([]);

  useEffect(() => {
    const map = new Map<string, number>();
    const data: EventGenreChartObject[] = [];
    const genres = ['AngularJS', 'Node', 'React', 'jQuery', 'JavaScript'];

    events.forEach((event) => {
      if (!event.summary) return;
      const summaryWords = event.summary.split(' ');
      genres.forEach((genre) => {
        if (summaryWords.includes(genre)) {
          map.set(genre, (map.get(genre) ?? 0) + 1);
        }
      });
    });
    map.forEach((value, key) => {
      data.push({ genre: key, value: value });
    });
    setChartData(data);
  }, [events]);

  const COLORS = ['#bcdcdb', '#a9c6c5', '#96b0af', '#d0e7e6', '#e4f1f1'];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = outerRadius * 1.15;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#757575"
        fontSize={14}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central">
        {`${chartData[index].genre}\n${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer height={400} className="pie-chart">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="50%"
          fill="#8884d8"
          dataKey="value">
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GenrePieChart;
