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

  const renderChart = () => {
    const data = stats.links.map(link => ({
      name: link.name,
      value: link.clicks,
      color: link.color
    }))

    const currentTheme = THEMES[theme]
    const currentColors = COLOR_SCHEMES[colorScheme]

    const commonProps = {
      data,
      margin: { top: 20, right: isMobile ? 10 : 30, left: isMobile ? 0 : 20, bottom: 5 },
      style: { color: currentTheme.text }
    }

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.grid} />}
            <XAxis
              dataKey="name"
              angle={isMobile ? -60 : -45}
              textAnchor="end"
              height={isMobile ? 80 : 60}
              interval={0}
              tick={{ fontSize: isMobile ? 10 : 12, fill: currentTheme.text }}
            />
            <YAxis tick={{ fontSize: isMobile ? 10 : 12, fill: currentTheme.text }} />
            <Tooltip
              contentStyle={{
                fontSize: isMobile ? '12px' : '14px',
                padding: isMobile ? '8px' : '12px',
                backgroundColor: currentTheme.tooltip,
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: currentTheme.text
              }}
              animationDuration={300}
            />
            <Bar
              dataKey="value"
              fill="#8884d8"
              animationDuration={1000}
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={currentColors[index % currentColors.length]}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
              ))}
            </Bar>
            {showLegend && (
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  fontSize: isMobile ? '10px' : '12px',
                  color: currentTheme.text
                }}
              />
            )}
          </BarChart>
        )
      case 'pie':
        return (
          <PieChart {...commonProps}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={isMobile ? 80 : 100}
              label={{ fontSize: isMobile ? 10 : 12, fill: currentTheme.text }}
              animationDuration={1000}
              animationBegin={0}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={currentColors[index % currentColors.length]}
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  style={{
                    cursor: 'pointer',
                    opacity: activeIndex === null || activeIndex === index ? 1 : 0.5,
                    transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                fontSize: isMobile ? '12px' : '14px',
                padding: isMobile ? '8px' : '12px',
                backgroundColor: currentTheme.tooltip,
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: currentTheme.text
              }}
              animationDuration={300}
            />
            {showLegend && (
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  fontSize: isMobile ? '10px' : '12px',
                  color: currentTheme.text
                }}
              />
            )}
          </PieChart>
        )
      case 'line':
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.grid} />}
            <XAxis
              dataKey="name"
              angle={isMobile ? -60 : -45}
              textAnchor="end"
              height={isMobile ? 80 : 60}
              interval={0}
              tick={{ fontSize: isMobile ? 10 : 12, fill: currentTheme.text }}
            />
            <YAxis tick={{ fontSize: isMobile ? 10 : 12, fill: currentTheme.text }} />
            <Tooltip
              contentStyle={{
                fontSize: isMobile ? '12px' : '14px',
                padding: isMobile ? '8px' : '12px',
                backgroundColor: currentTheme.tooltip,
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: currentTheme.text
              }}
              animationDuration={300}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={currentColors[0]}
              strokeWidth={isMobile ? 1.5 : 2}
              animationDuration={1000}
              animationBegin={0}
              dot={{ r: 4, strokeWidth: 2, fill: currentColors[0] }}
              activeDot={{ r: 6, strokeWidth: 2, fill: currentColors[0] }}
            />
            {showLegend && (
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  fontSize: isMobile ? '10px' : '12px',
                  color: currentTheme.text
                }}
              />
            )}
          </LineChart>
        )
      default:
        return null
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