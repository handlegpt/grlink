import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line
} from 'recharts'
import { Link } from '../services/api'

interface ClickStatsChartProps {
  links: Link[]
}

const ClickStatsChart: React.FC<ClickStatsChartProps> = ({ links }) => {
  const { t } = useTranslation()
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar')

  const data = links
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5)
    .map(link => ({
      name: link.name,
      clicks: link.clicks,
      color: link.color
    }))

  const CustomBar = ({ x, y, width, height, color }: any) => {
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        rx={4}
        ry={4}
      />
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{t('stats.title')}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded ${
              chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            {t('chartTypes.bar')}
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded ${
              chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            {t('chartTypes.line')}
          </button>
        </div>
      </div>
      <div className="h-64">
        {chartType === 'bar' ? (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <Bar
              dataKey="clicks"
              fill="#8884d8"
              shape={<CustomBar />}
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <rect
                  key={`bar-${index}`}
                  fill={entry.color}
                />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <Line type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        )}
      </div>
    </div>
  )
}

export default ClickStatsChart 