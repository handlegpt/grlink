import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts'
import { linkApi, LinkStats } from '../services/api'

const THEMES = {
  light: {
    background: '#ffffff',
    text: '#1f2937',
    grid: '#e5e7eb',
    tooltip: 'rgba(255, 255, 255, 0.9)'
  },
  dark: {
    background: '#1f2937',
    text: '#f3f4f6',
    grid: '#374151',
    tooltip: 'rgba(31, 41, 55, 0.9)'
  }
}

const COLOR_SCHEMES = {
  default: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'],
  pastel: ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFE4BA'],
  vibrant: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']
}

const StatsDashboard = () => {
  const { t } = useTranslation()
  const [timeRange, setTimeRange] = useState('7')
  const [stats, setStats] = useState<LinkStats>({ totalClicks: 0, links: [] })
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar')
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [colorScheme, setColorScheme] = useState<'default' | 'pastel' | 'vibrant'>('default')
  const [showGrid, setShowGrid] = useState(true)
  const [showLegend, setShowLegend] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const endDate = new Date()
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - parseInt(timeRange))
        
        const response = await linkApi.getStats(
          startDate.toISOString(),
          endDate.toISOString()
        )
        setStats(response.data)
      } catch (error) {
        console.error('获取统计数据失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [timeRange])

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  const renderBarChart = () => (
    <BarChart
      data={stats}
      margin={isMobile ? { top: 20, right: 30, left: 20, bottom: 5 } : { top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        angle={isMobile ? -45 : 0}
        textAnchor={isMobile ? "end" : "middle"}
        height={isMobile ? 60 : 30}
        interval={isMobile ? 1 : 0}
      />
      <YAxis />
      <Tooltip />
      <Bar dataKey="clicks" fill="#8884d8" />
    </BarChart>
  )

  const renderPieChart = () => (
    <PieChart width={isMobile ? 300 : 400} height={isMobile ? 300 : 400}>
      <Pie
        data={stats}
        dataKey="clicks"
        nameKey="date"
        cx="50%"
        cy="50%"
        outerRadius={isMobile ? 100 : 150}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
      >
        {stats.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLOR_SCHEMES[colorScheme][index % COLOR_SCHEMES[colorScheme].length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  )

  const renderLineChart = () => (
    <LineChart
      data={stats}
      margin={isMobile ? { top: 20, right: 30, left: 20, bottom: 5 } : { top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        angle={isMobile ? -45 : 0}
        textAnchor={isMobile ? "end" : "middle"}
        height={isMobile ? 60 : 30}
        interval={isMobile ? 1 : 0}
      />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
    </LineChart>
  )

  const renderChart = (): JSX.Element => {
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full sm:w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="7">{t('profile.days', { count: 7 })}</option>
            <option value="30">{t('profile.days', { count: 30 })}</option>
            <option value="90">{t('profile.days', { count: 90 })}</option>
            <option value="all">{t('profile.allTime')}</option>
          </select>
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded-md whitespace-nowrap transition-all duration-200 ${
                chartType === 'bar'
                  ? 'bg-indigo-600 text-white scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('dashboard.chartTypes.bar')}
            </button>
            <button
              onClick={() => setChartType('pie')}
              className={`px-3 py-1 rounded-md whitespace-nowrap transition-all duration-200 ${
                chartType === 'pie'
                  ? 'bg-indigo-600 text-white scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('dashboard.chartTypes.pie')}
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-md whitespace-nowrap transition-all duration-200 ${
                chartType === 'line'
                  ? 'bg-indigo-600 text-white scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('dashboard.chartTypes.line')}
            </button>
          </div>
        </div>
        <div className="text-lg font-semibold w-full sm:w-auto text-center sm:text-left">
          {t('profile.totalClicks')}: {stats.totalClicks}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">主题</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="light">浅色</option>
            <option value="dark">深色</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">配色</label>
          <select
            value={colorScheme}
            onChange={(e) => setColorScheme(e.target.value as 'default' | 'pastel' | 'vibrant')}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="default">默认</option>
            <option value="pastel">柔和</option>
            <option value="vibrant">鲜艳</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">网格</label>
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">图例</label>
          <input
            type="checkbox"
            checked={showLegend}
            onChange={(e) => setShowLegend(e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} rounded-lg p-2 sm:p-4 shadow-sm transition-colors duration-200`}>
        <div className="h-[300px] sm:h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}

export default StatsDashboard 