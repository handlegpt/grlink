import { useTranslation } from 'react-i18next'
import StatsDashboard from '../components/StatsDashboard'
import ClickStatsChart from '../components/ClickStatsChart'

const Dashboard = () => {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        {t('dashboard.title')}
      </h1>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t('dashboard.stats')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatsDashboard links={links} />
            <ClickStatsChart links={links} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 