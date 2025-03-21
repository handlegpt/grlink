import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '../services/api'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'

interface StatsDashboardProps {
  links: Link[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const StatsDashboard: React.FC<StatsDashboardProps> = ({ links }) => {
  const { t } = useTranslation()
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar')

  const data = links.map(link => ({
    name: link.name,
    clicks: link.clicks,
    value: link.clicks
  }))

  const renderBarChart = () => (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="clicks" fill="#8884d8" />
    </BarChart>
  )

  const renderPieChart = () => (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx={200}
        cy={150}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )

  const renderLineChart = () => (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
    </LineChart>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('stats.title')}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType('bar')}
            className={`px-4 py-2 rounded ${
              chartType === 'bar'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t('stats.bar')}
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`px-4 py-2 rounded ${
              chartType === 'pie'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t('stats.pie')}
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-4 py-2 rounded ${
              chartType === 'line'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t('stats.line')}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {chartType === 'bar' && renderBarChart()}
        {chartType === 'pie' && renderPieChart()}
        {chartType === 'line' && renderLineChart()}
      </div>
    </div>
  )
}

export default StatsDashboard 