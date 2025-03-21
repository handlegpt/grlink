import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import { Link } from '../services/api'

interface LinkStats {
  name: string
  clicks: number
  color: string
}

interface StatsDashboardProps {
  links: Link[]
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ links }) => {
  const { t } = useTranslation()
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar')

  const data: LinkStats[] = links
    .sort((a, b) => b.clicks - a.clicks)
    .map(link => ({
      name: link.name,
      clicks: link.clicks,
      color: link.color
    }))

  const renderBarChart = () => (
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
      <Bar dataKey="clicks" fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  )

  const renderPieChart = () => (
    <PieChart>
      <Pie
        data={data}
        dataKey="clicks"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      />
    </PieChart>
  )

  const renderLineChart = () => (
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
  )

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return renderBarChart()
      case 'pie':
        return renderPieChart()
      case 'line':
        return renderLineChart()
      default:
        return renderBarChart()
    }
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
            onClick={() => setChartType('pie')}
            className={`px-3 py-1 rounded ${
              chartType === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            {t('chartTypes.pie')}
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
        {renderChart()}
      </div>
    </div>
  )
}

export default StatsDashboard 